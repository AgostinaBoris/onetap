import { BackButton } from "../BackButton";
import { CTAButton } from "../CTAButton";

const TOPICS = [
  {
    icon: "plus-circle",
    iconColor: "#19E680",
    iconBg: "rgba(25,230,128,.12)",
    title: "Add income or expenses",
    body: "Use the Income and Expense buttons from Home.",
    delay: 0.08,
  },
  {
    icon: "chart-pie-slice",
    iconColor: "#3390FD",
    iconBg: "rgba(51,144,253,.12)",
    title: "Review spending by category",
    body: "Open Balance to compare income, expenses and savings.",
    delay: 0.12,
  },
  {
    icon: "squares-four",
    iconColor: "#C06BFF",
    iconBg: "rgba(192,107,255,.12)",
    title: "Manage categories",
    body: "Use Categories to organize your financial movements.",
    delay: 0.16,
  },
];

export function Help({ onBack }: { onBack: () => void }) {
  return (
    <div
      className="otscroll"
      style={{ position: "absolute", inset: 0, overflowY: "auto", animation: "screenIn .35s ease", paddingTop: 52 }}
    >
      <div style={{ padding: "60px 22px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <BackButton onClick={onBack} />
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 24, color: "#F1F5F9", letterSpacing: "-.02em" }}>
            Help
          </div>
        </div>

        <div
          style={{
            position: "relative",
            borderRadius: 22,
            padding: 22,
            background: "linear-gradient(165deg,#0E1219,#080A0F)",
            border: "1px solid rgba(241,245,249,.08)",
            overflow: "hidden",
            boxShadow: "0 18px 44px -22px rgba(0,0,0,.6)",
            animation: "cardIn .55s ease .04s backwards",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -45,
              width: 170,
              height: 170,
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(51,144,253,.14),transparent 74%)",
            }}
          />
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 15, background: "rgba(51,144,253,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ph-duotone ph-question" style={{ fontSize: 25, color: "#3390FD" }} />
            </div>
            <div>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 18, color: "#F1F5F9", letterSpacing: "-.02em" }}>
                How can we help?
              </div>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 14, color: "#94A3B8", marginTop: 4, lineHeight: 1.4 }}>
                Find quick answers about transactions, categories and balance.
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          {TOPICS.map((topic) => (
            <div
              key={topic.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "15px 16px",
                borderRadius: 14,
                background: "#0C0E12",
                border: "1px solid rgba(241,245,249,.06)",
                animation: `cardIn .5s ease ${topic.delay}s backwards`,
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 13, background: topic.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className={`ph-duotone ph-${topic.icon}`} style={{ fontSize: 22, color: topic.iconColor }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F5F9" }}>{topic.title}</div>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 12.5, color: "#5B6578", marginTop: 2 }}>
                  {topic.body}
                </div>
              </div>
            </div>
          ))}
        </div>

        <CTAButton onClick={onBack} style={{ height: 56, borderRadius: 16, fontSize: 16, marginTop: 22, animation: "none" }}>
          Back to Home
        </CTAButton>
      </div>
    </div>
  );
}
