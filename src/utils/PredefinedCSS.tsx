export const COLORS = {
  pageBlack: "#000000",
  cardBg: "rgba(15,23,42,0.92)", // slate-ish
  inputBg: "rgba(15,23,42,0.9)",
  emerald: "#10b981",
  whiteDim: "rgba(255,255,255,0.9)",
  error: "#ef4444",
};

export const baseInputStyle: React.CSSProperties = {
  width: "100%",
  background: COLORS.inputBg,
  color: "white",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "10px 12px",
  fontSize: "0.95rem",
  outline: "none",
  boxSizing: "border-box",
};

export const handleBtnEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    (
      e.currentTarget as HTMLButtonElement
    ).style.boxShadow = `0 10px 25px ${COLORS.emerald}55`;
  };
export const handleBtnLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
  };

export  const paperStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    maxWidth: 480,
    width: "100%",
    backgroundColor: COLORS.cardBg,
    border: `1px solid ${COLORS.emerald}99`,
    padding: 20,
    borderRadius: 10,
  };

export  const headerTitleStyle: React.CSSProperties = {
    margin: 0,
    color: COLORS.emerald,
    fontSize: 20,
    lineHeight: 1,
  };

export  const labelStyle: React.CSSProperties = {
    display: "block",
    color: COLORS.whiteDim,
    marginBottom: 6,
    fontSize: 14,
  };

export  const errorStyle: React.CSSProperties = {
    color: COLORS.error,
    marginTop: 6,
    fontSize: 13,
  };

export  const rowStyle: React.CSSProperties = { display: "flex", gap: 12 };
export  const colStyle: React.CSSProperties = { flex: 1, minWidth: 0 };

export  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    background: COLORS.inputBg,
    color: "white",
    border: "1px solid rgba(255,255,255,0.08)",
  };
