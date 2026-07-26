"use client";

import { useState } from "react";
import { PhoneChrome } from "@/components/PhoneChrome";
import { TabBar } from "@/components/TabBar";
import { SuccessOverlay } from "@/components/SuccessOverlay";
import { Onboarding } from "@/components/screens/Onboarding";
import { Login } from "@/components/screens/Login";
import { Signup } from "@/components/screens/Signup";
import { SignupSuccess } from "@/components/screens/SignupSuccess";
import { Home } from "@/components/screens/Home";
import { Balance } from "@/components/screens/Balance";
import { Transactions } from "@/components/screens/Transactions";
import { Categories } from "@/components/screens/Categories";
import { NewMovement } from "@/components/screens/NewMovement";
import { Profile } from "@/components/screens/Profile";
import { Settings } from "@/components/screens/Settings";
import { Help } from "@/components/screens/Help";
import {
  BASE_BALANCE,
  CATEGORIES,
  CATEGORIES_SCREEN_EXPENSE_KEYS,
  CATEGORIES_SCREEN_INCOME_KEYS,
  CATEGORY_COLOR_CHOICES,
  EXPENSE_CATEGORY_KEYS,
  HOME_CHIP_KEYS,
  ICON_CHOICES,
  INCOME_CATEGORY_KEYS,
  INITIAL_TRANSACTIONS,
  MONTHS,
  COLORS,
} from "@/lib/data";
import { filterButtonStyle, fmt, fmtDec, formatNmDate, iconWrap, isSameDay, rgba, tile, toRow } from "@/lib/helpers";
import type { Category, CategoryKey, CustomCategory, NavItem, NumpadKey, Screen, Tab, Transaction, TransactionType } from "@/lib/types";

export default function OneTapApp() {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [tab, setTab] = useState<Tab>("home");
  const [showMenu, setShowMenu] = useState(false);
  const [boltSpin, setBoltSpin] = useState(false);
  const [cameFromProfile, setCameFromProfile] = useState(false);

  const [nmType, setNmType] = useState<TransactionType>("gasto");
  const [nmAmount, setNmAmount] = useState("");
  const [nmCategory, setNmCategory] = useState<CategoryKey | null>(null);
  const [nmDescription, setNmDescription] = useState("");
  const [nmDate, setNmDate] = useState(() => new Date());
  const [nmCalendarView, setNmCalendarView] = useState(() => new Date());
  const [nmAmountModalOpen, setNmAmountModalOpen] = useState(false);
  const [nmDateModalOpen, setNmDateModalOpen] = useState(false);

  const [movFilter, setMovFilter] = useState<"todos" | "ingresos" | "gastos">("todos");
  const [monthIdx, setMonthIdx] = useState(2);

  const [sNotif, setSNotif] = useState(true);
  const [sBiometria, setSBiometria] = useState(true);
  const [sResumen, setSResumen] = useState(true);
  const [sLanguage, setSLanguage] = useState("ES");

  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [successType, setSuccessType] = useState<TransactionType>("gasto");
  const [successAmount, setSuccessAmount] = useState(0);
  const [successCat, setSuccessCat] = useState<CategoryKey | null>(null);

  const [customCategories, setCustomCategories] = useState<CustomCategory[]>([]);
  const [catSheetOpen, setCatSheetOpen] = useState(false);
  const [catSheetType, setCatSheetType] = useState<TransactionType>("gasto");
  const [catName, setCatName] = useState("");
  const [catIcon, setCatIcon] = useState<string | null>(null);

  const go = (next: Screen, nextTab?: Tab) => {
    setScreen(next);
    if (nextTab) setTab(nextTab);
  };

  const openNuevoExpense = () => {
    setScreen("nuevo");
    setNmType("gasto");
    setNmAmount("");
    setNmCategory(null);
    setNmDescription("");
    setNmDate(new Date());
    setNmCalendarView(new Date());
    setNmAmountModalOpen(false);
    setNmDateModalOpen(false);
  };
  const openNuevoIncome = () => {
    setScreen("nuevo");
    setNmType("ingreso");
    setNmAmount("");
    setNmCategory("salario");
    setNmDescription("");
    setNmDate(new Date());
    setNmCalendarView(new Date());
    setNmAmountModalOpen(false);
    setNmDateModalOpen(false);
  };
  const spinBolt = () => {
    setBoltSpin(true);
    setTimeout(() => {
      setBoltSpin(false);
      openNuevoExpense();
    }, 600);
  };
  const confirmNm = () => {
    const amt = parseInt(nmAmount, 10);
    if (!(amt > 0) || !nmCategory) return;
    const tx: Transaction = {
      id: Date.now(),
      name: nmDescription.trim(),
      type: nmType,
      amount: amt,
      category: nmCategory,
      date: formatNmDate(nmDate),
    };
    setTransactions((prev) => [tx, ...prev]);
    setSuccessType(nmType);
    setSuccessAmount(amt);
    setSuccessCat(nmCategory);
    setScreen("success");
  };

  const deleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const openNewCategory = () => {
    setCatSheetType("gasto");
    setCatName("");
    setCatIcon(null);
    setCatSheetOpen(true);
  };
  const saveNewCategory = () => {
    const label = catName.trim();
    if (!label || !catIcon) return;
    const key = `custom_${Date.now()}`;
    const color = CATEGORY_COLOR_CHOICES[customCategories.length % CATEGORY_COLOR_CHOICES.length];
    setCustomCategories((prev) => [...prev, { key, label, icon: catIcon, color, type: catSheetType }]);
    setCatSheetOpen(false);
  };

  // ---- derived values (recomputed each render, mirroring renderVals()) ----
  let ing = 0;
  let gas = 0;
  for (const t of transactions) {
    if (t.type === "ingreso") ing += t.amount;
    else gas += t.amount;
  }
  const neto = ing - gas;
  const totalBalance = BASE_BALANCE + neto;

  const categoryMap: Record<string, Category> = { ...CATEGORIES };
  for (const c of customCategories) categoryMap[c.key] = c;
  const customExpenseKeys = customCategories.filter((c) => c.type === "gasto").map((c) => c.key);
  const customIncomeKeys = customCategories.filter((c) => c.type === "ingreso").map((c) => c.key);

  const isExpense = nmType === "gasto";
  const numpadRaw = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "000", "0", "del"];
  const nmKeys: NumpadKey[] = numpadRaw.map((k) => ({
    label: k === "del" ? "" : k,
    icon: k === "del" ? "backspace" : null,
    isDel: k === "del",
    onPress: () => {
      if (k === "del") {
        setNmAmount((prev) => prev.slice(0, -1));
      } else {
        setNmAmount((prev) => {
          const v = prev + k;
          return v.replace(/^0+/, "").length <= 7 ? v.replace(/^0+(?=\d)/, "") : prev;
        });
      }
    },
  }));
  const nmAmt = nmAmount ? parseInt(nmAmount, 10) : 0;
  const nmCatKeys = [
    ...(isExpense ? EXPENSE_CATEGORY_KEYS : INCOME_CATEGORY_KEYS),
    ...(isExpense ? customExpenseKeys : customIncomeKeys),
  ];
  const nmGridCats = nmCatKeys.map((k, i) => tile(k, categoryMap[k], nmCategory === k, () => setNmCategory(k), i));
  const nmDateText = formatNmDate(nmDate);

  const calYear = nmCalendarView.getFullYear();
  const calMonth = nmCalendarView.getMonth();
  const calMonthLabel = nmCalendarView.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const calFirstDay = new Date(calYear, calMonth, 1).getDay();
  const calDaysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const calToday = new Date();
  const calCells: (Date | null)[] = [
    ...Array.from({ length: calFirstDay }, () => null),
    ...Array.from({ length: calDaysInMonth }, (_, i) => new Date(calYear, calMonth, i + 1)),
  ];
  const nmCanConfirm = nmAmt > 0 && !!nmCategory && nmDescription.trim().length > 0;

  const catExpenses = [...CATEGORIES_SCREEN_EXPENSE_KEYS, ...customExpenseKeys].map((k, i) =>
    tile(k, categoryMap[k], false, () => {}, i, false)
  );
  const catIncome = [...CATEGORIES_SCREEN_INCOME_KEYS, ...customIncomeKeys].map((k, i) =>
    tile(k, categoryMap[k], false, () => {}, i, false)
  );

  const filteredTx = transactions.filter((x) =>
    movFilter === "todos" ? true : movFilter === "ingresos" ? x.type === "ingreso" : x.type === "gasto"
  );
  const movList = [...filteredTx].reverse().map((x, i) => toRow(x, categoryMap, i));

  const navDef: [Tab, string, string][] = [
    ["home", "Home", "house"],
    ["balance", "Balance", "chart-line-up"],
    ["movimientos", "Transactions", "arrows-left-right"],
    ["perfil", "Profile", "user"],
  ];
  const navItems: NavItem[] = navDef.map(([key, label, icon]) => {
    const on = tab === key;
    return {
      label,
      icon,
      weight: on ? "fill" : "duotone",
      fw: on ? 700 : 600,
      color: on ? COLORS.blue : COLORS.mut,
      onPress: () => go(key, key),
    };
  });

  const catChips = HOME_CHIP_KEYS.map((k, i) => ({
    label: CATEGORIES[k].label,
    icon: CATEGORIES[k].icon,
    iconWrap: iconWrap(CATEGORIES[k].color, 34),
    onPress: () => openNuevoExpense(),
    chipStyle: {
      display: "flex" as const,
      flexDirection: "column" as const,
      alignItems: "center" as const,
      gap: 8,
      padding: "12px 8px",
      borderRadius: 16,
      background: "radial-gradient(120% 130% at 50% 6%, #163a6e 0%, #0c1f3e 55%, #060e1f 100%)",
      border: "1px solid rgba(90,170,255,.32)",
      boxShadow: "0 0 14px -8px rgba(51,144,253,.4)",
      cursor: "pointer" as const,
      transition: "transform .3s cubic-bezier(.34,1.56,.64,1),border-color .2s,box-shadow .2s",
      animation: "cardIn .5s ease backwards",
      animationDelay: i * 0.05 + "s",
    },
  }));

  const showNav = (["home", "balance", "movimientos", "perfil", "nuevo"] as Screen[]).includes(screen);

  const closeBalanceDetail = () => {
    if (cameFromProfile) {
      setScreen("perfil");
      setCameFromProfile(false);
    } else {
      setScreen("home");
      setTab("home");
      setCameFromProfile(false);
    }
  };

  const logout = () => {
    setScreen("onboarding");
    setTab("home");
    setShowMenu(false);
  };

  return (
    <PhoneChrome>
      {screen === "onboarding" && (
        <Onboarding
          boltSpinning={boltSpin}
          onSpinBolt={spinBolt}
          onLogin={() => go("login")}
          onSignup={() => go("signup")}
          onGuest={() => go("home", "home")}
        />
      )}

      {screen === "login" && <Login onBack={() => go("onboarding")} onSignIn={() => go("home", "home")} />}

      {screen === "signup" && <Signup onBack={() => go("onboarding")} onCreateAccount={() => go("signupSuccess")} />}

      {screen === "signupSuccess" && <SignupSuccess onContinue={() => go("home", "home")} />}

      {screen === "home" && (
        <Home
          userName="Agostina"
          showMenu={showMenu}
          onOpenMenu={() => setShowMenu((v) => !v)}
          onCloseMenu={() => setShowMenu(false)}
          onOpenCategorias={() => {
            setShowMenu(false);
            go("categorias");
          }}
          onGoBalance={() => {
            setCameFromProfile(false);
            go("balance", "balance");
          }}
          onOpenSettings={() => {
            setShowMenu(false);
            go("settings");
          }}
          onOpenHelp={() => {
            setShowMenu(false);
            go("help");
          }}
          onLogout={logout}
          totalBalanceText={fmtDec(totalBalance)}
          onOpenIncome={openNuevoIncome}
          onOpenExpense={openNuevoExpense}
          catChips={catChips}
          onSeeAllCategories={() => go("categorias")}
          onSeeAllRecent={() => go("movimientos", "movimientos")}
          recentTx={transactions.slice(0, 5).map((x, i) => toRow(x, categoryMap, i))}
        />
      )}

      {screen === "balance" && (
        <Balance
          onClose={closeBalanceDetail}
          balNetoText={fmtDec(neto)}
          balVsLastMonthText="+8.4%"
          onPrevMonth={() => setMonthIdx((v) => Math.max(0, v - 1))}
          onNextMonth={() => setMonthIdx((v) => Math.min(MONTHS.length - 1, v + 1))}
          monthLabel={MONTHS[monthIdx]}
          balIncomeText={fmt(ing)}
          balExpensesText={fmt(gas)}
          balSavingsRateText={Math.round((neto / ing) * 100) + "%"}
          onSeeAllRecent={() => go("movimientos", "movimientos")}
          balRecent={transactions.slice(2, 6).map((x) => toRow(x, categoryMap))}
        />
      )}

      {screen === "movimientos" && (
        <Transactions
          onBack={() => go("home", "home")}
          filtAll={{ label: "All", onPress: () => setMovFilter("todos"), style: filterButtonStyle(movFilter === "todos") }}
          filtIncome={{
            label: "Income",
            onPress: () => setMovFilter("ingresos"),
            style: filterButtonStyle(movFilter === "ingresos"),
          }}
          filtExpenses={{
            label: "Expenses",
            onPress: () => setMovFilter("gastos"),
            style: filterButtonStyle(movFilter === "gastos"),
          }}
          movList={movList}
          onDeleteTransaction={deleteTransaction}
        />
      )}

      {screen === "categorias" && (
        <Categories
          onBack={() => go("home", "home")}
          catExpenses={catExpenses}
          catIncome={catIncome}
          sheetOpen={catSheetOpen}
          onOpenSheet={openNewCategory}
          onCloseSheet={() => setCatSheetOpen(false)}
          catType={catSheetType}
          onSetCatType={setCatSheetType}
          catName={catName}
          onCatNameChange={setCatName}
          iconChoices={ICON_CHOICES}
          catIcon={catIcon}
          onSelectIcon={setCatIcon}
          onSave={saveNewCategory}
          canSave={catName.trim().length > 0 && !!catIcon}
        />
      )}

      {screen === "nuevo" && (
        <NewMovement
          onBack={() => go("home", "home")}
          onOpenMenu={() => go("settings")}
          amountText={fmt(nmAmt)}
          amountColor={nmAmt > 0 ? COLORS.txt : COLORS.mut}
          amountModalOpen={nmAmountModalOpen}
          onOpenAmount={() => setNmAmountModalOpen(true)}
          onCloseAmount={() => setNmAmountModalOpen(false)}
          dateText={nmDateText}
          dateModalOpen={nmDateModalOpen}
          onOpenDate={() => setNmDateModalOpen(true)}
          onCloseDate={() => setNmDateModalOpen(false)}
          calendarMonthLabel={calMonthLabel}
          onPrevMonth={() => setNmCalendarView(new Date(calYear, calMonth - 1, 1))}
          onNextMonth={() => setNmCalendarView(new Date(calYear, calMonth + 1, 1))}
          calendarCells={calCells}
          selectedDate={nmDate}
          todayDate={calToday}
          onSelectDate={(d: Date) => {
            const withTime = new Date(d);
            withTime.setHours(nmDate.getHours(), nmDate.getMinutes());
            setNmDate(withTime);
            setNmDateModalOpen(false);
          }}
          isSameDay={isSameDay}
          subtitle="SELECT A CATEGORY"
          gridCats={nmGridCats}
          categorySelected={!!nmCategory}
          descriptionValue={nmDescription}
          onDescriptionChange={setNmDescription}
          keys={nmKeys}
          onConfirm={confirmNm}
          canConfirm={nmCanConfirm}
          confirmStyle={{
            width: "100%",
            height: 58,
            border: "none",
            borderRadius: 20,
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 600,
            fontSize: 17,
            cursor: nmCanConfirm ? "pointer" : "default",
            color: nmCanConfirm ? "#fff" : COLORS.mut,
            background: nmCanConfirm
              ? isExpense
                ? "linear-gradient(150deg,#F87171,#e5484d)"
                : "linear-gradient(150deg,#19E680,#12b869)"
              : "#0C0E12",
            boxShadow: nmCanConfirm ? "0 14px 30px -8px rgba(0,0,0,.5)" : "none",
            transition: "all .2s",
          }}
        />
      )}

      {screen === "perfil" && (
        <Profile
          totalBalanceText={fmtDec(totalBalance)}
          savingsText={fmt(1120)}
          onOpenBalance={() => {
            setCameFromProfile(true);
            setScreen("balance");
          }}
          onOpenSettings={() => go("settings")}
          onLogout={logout}
        />
      )}

      {screen === "settings" && (
        <Settings
          onBack={() => go("perfil", "perfil")}
          notif={sNotif}
          onToggleNotif={() => setSNotif((v) => !v)}
          biometria={sBiometria}
          onToggleBiometria={() => setSBiometria((v) => !v)}
          resumen={sResumen}
          onToggleResumen={() => setSResumen((v) => !v)}
          language={sLanguage}
          onToggleLanguage={() => setSLanguage((v) => (v === "ES" ? "EN" : "ES"))}
          onLogout={logout}
        />
      )}

      {screen === "help" && <Help onBack={() => go("home", "home")} />}

      {showNav && <TabBar items={navItems} />}

      {screen === "success" && (
        <SuccessOverlay
          title={successType === "ingreso" ? "Income added!" : "Expense added!"}
          amountText={(successType === "ingreso" ? "+" : "−") + fmt(successAmount)}
          color={successType === "ingreso" ? COLORS.green : COLORS.red}
          ringBg={rgba(successType === "ingreso" ? COLORS.green : COLORS.red, 0.16)}
          catLabel={successCat ? categoryMap[successCat]?.label ?? "" : ""}
          onContinue={() => {
            setScreen("home");
            setTab("home");
            setNmAmount("");
            setNmCategory(null);
            setNmDescription("");
          }}
        />
      )}
    </PhoneChrome>
  );
}
