import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import createProfile from "../../Services/ProfileService";
import { errorNotification, successNotification } from "../../Utility/NotificationUtility";

const COLORS = {
  pageBlack: "#000000",
  cardBg: "rgba(15,23,42,0.92)", // slate-ish
  inputBg: "rgba(15,23,42,0.9)",
  emerald: "#10b981",
  whiteDim: "rgba(255,255,255,0.9)",
  error: "#ef4444",
};

const baseInputStyle: React.CSSProperties = {
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

export default function PatientProfileForm() {
  const token = useSelector((state: any) => state.jwtSlice).toString();
  const user = useSelector((state: any) => state.userSlice);

  const [profileData, setProfileData] = useState({
    id: user?.decoded?.profileId,
    name: user?.decoded?.name,
    email: user?.decoded?.emailId,
    dob: "",
    phone: "",
    address: "",
    aadhaarNo: "",
    bloodGroup: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState<{ phone?: string; aadhaarNo?: string }>(
    {}
  );

  function validatePhone(phone?: string) {
    if (!phone) return "Phone is required";
    if (!/^\d{10}$/.test(phone)) return "Phone must be 10 digits";
    return undefined;
  }

  function validateAadhaar(aadhaar?: string) {
    if (!aadhaar) return "Aadhaar is required";
    const digits = aadhaar.replace(/\s+/g, "");
    if (!/^\d{12}$/.test(digits)) return "Aadhaar must be 12 digits";
    return undefined;
  }

  const bloodGroupOptions = [
    { value: "A_POSITIVE", label: "A+" },
    { value: "A_NEGATIVE", label: "A-" },
    { value: "B_POSITIVE", label: "B+" },
    { value: "B_NEGATIVE", label: "B-" },
    { value: "AB_POSITIVE", label: "AB+" },
    { value: "AB_NEGATIVE", label: "AB-" },
    { value: "O_POSITIVE", label: "O+" },
    { value: "O_NEGATIVE", label: "O-" },
  ];

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneErr = validatePhone(profileData.phone);
    const aadhaarErr = validateAadhaar(profileData.aadhaarNo);

    if (!phoneErr || !aadhaarErr)
      errorNotification("Please enter correct details");
    setErrors({ phone: phoneErr, aadhaarNo: aadhaarErr });

    try {
      const response = await createProfile({
        id: profileData.id,
        name: profileData.name,
        email: profileData.email,
        dob: profileData.dob ?? null,
        phone: profileData.phone,
        address: profileData.address,
        aadhaarNo: profileData.aadhaarNo,
        bloodGroup: profileData.bloodGroup,
      }, token);
      setSubmitting(true);
      console.log("Profile created:", response);
      successNotification("Profile Created Successfully");
    } catch (error: any) {
      console.error("Profile creation error:", error);
      errorNotification(
        error?.response?.data?.errorMessage || "Failed to save profile"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDobChange = (date: Date) => {
    setProfileData((p) => ({
      ...p,
      dob: date ? date.toISOString().split("T")[0] : "",
    }));
  };

  function validateDob(dob?: string) {
    if (!dob) return "DOB is required";
    // format YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return "Use format YYYY-MM-DD";
    const parts = dob.split("-");
    const year = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const day = Number(parts[2]);
    const dt = new Date(year, month, day);
    if (isNaN(dt.getTime())) return "Invalid date";
    const today = new Date();
    // compare date-only
    const dtOnly = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    if (dtOnly > todayOnly) return "DOB cannot be in the future";
    return "";
  }
  const handleBtnEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    (
      e.currentTarget as HTMLButtonElement
    ).style.boxShadow = `0 10px 25px ${COLORS.emerald}55`;
  };
  const handleBtnLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
  };

  const paperStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    maxWidth: 480,
    width: "100%",
    backgroundColor: COLORS.cardBg,
    border: `1px solid ${COLORS.emerald}99`,
    padding: 20,
    borderRadius: 10,
  };

  const headerTitleStyle: React.CSSProperties = {
    margin: 0,
    color: COLORS.emerald,
    fontSize: 20,
    lineHeight: 1,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    color: COLORS.whiteDim,
    marginBottom: 6,
    fontSize: 14,
  };

  const errorStyle: React.CSSProperties = {
    color: COLORS.error,
    marginTop: 6,
    fontSize: 13,
  };

  const rowStyle: React.CSSProperties = { display: "flex", gap: 12 };
  const colStyle: React.CSSProperties = { flex: 1, minWidth: 0 };

  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    background: COLORS.inputBg,
    color: "white",
    border: "1px solid rgba(255,255,255,0.08)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        position: "relative",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
        }}
      />

      <Paper
        component="form"
        onSubmit={HandleSubmit}
        radius="lg"
        shadow="xl"
        withBorder
        style={paperStyle}
      >
        <Stack spacing="sm" style={{ marginBottom: 12, alignItems: "center" }}>
          <Title style={headerTitleStyle}>I-Care Hospital</Title>
          <Text style={{ color: "rgba(255,255,255,0.85)" }}>
            Update your profile
          </Text>
        </Stack>

        <Stack spacing="sm">
          {/* DOB + Phone */}
          <div style={rowStyle}>
            <div style={colStyle}>
              <label style={labelStyle}>Date of Birth (YYYY-MM-DD)</label>
              <input
                type="text"
                placeholder="YYYY-MM-DD"
                value={profileData.dob ?? ""}
                onChange={(e) =>
                  setProfileData((p) => ({ ...p, dob: e.target.value }))
                }
                required
                style={baseInputStyle}
                onBlur={() =>
                  setErrors((s) => ({
                    ...s,
                    dob: validateDob(profileData.dob),
                  }))
                }
              />
              {errors.dob ? <div style={errorStyle}>{errors.dob}</div> : null}
            </div>

            <div style={colStyle}>
              <label style={labelStyle}>Phone</label>
              <input
                type="tel"
                placeholder="9876543210"
                value={profileData.phone ?? ""}
                onChange={(e) =>
                  setProfileData((p) => ({ ...p, phone: e.target.value }))
                }
                required
                style={baseInputStyle}
                onBlur={() =>
                  setErrors((s) => ({
                    ...s,
                    phone: validatePhone(profileData.phone),
                  }))
                }
              />
              {errors.phone ? (
                <div style={errorStyle}>{errors.phone}</div>
              ) : null}
            </div>
          </div>

          {/* Aadhaar + Blood */}
          <div style={rowStyle}>
            <div style={colStyle}>
              <label style={labelStyle}>Aadhaar number</label>
              <input
                type="text"
                placeholder="1234 5678 9012"
                value={profileData.aadhaarNo ?? ""}
                onChange={(e) =>
                  setProfileData((p) => ({ ...p, aadhaarNo: e.target.value }))
                }
                required
                style={baseInputStyle}
                onBlur={() =>
                  setErrors((s) => ({
                    ...s,
                    aadhaarNo: validateAadhaar(profileData.aadhaarNo),
                  }))
                }
              />
              {errors.aadhaarNo ? (
                <div style={errorStyle}>{errors.aadhaarNo}</div>
              ) : null}
            </div>

            <div style={colStyle}>
              <label style={labelStyle}>Blood group</label>
              <select
                value={profileData.bloodGroup ?? ""}
                onChange={(e) =>
                  setProfileData((p) => ({ ...p, bloodGroup: e.target.value }))
                }
                style={selectStyle}
              >
                <option value="">Select</option>
                {bloodGroupOptions.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label style={labelStyle}>Address</label>
            <textarea
              placeholder="House/Street/Locality, City, State, Country"
              value={profileData.address ?? ""}
              onChange={(e) =>
                setProfileData((p) => ({ ...p, address: e.target.value }))
              }
              style={{
                ...baseInputStyle,
                height: 86,
                resize: "vertical",
              }}
            />
          </div>

          {/* Save + note */}
          <Group position="apart" style={{ marginTop: 6 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Checkbox checked={false} onChange={() => {}} />
              <div style={{ color: "rgba(255,255,255,0.9)" }}>
                Save on this device
              </div>
            </div>

            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
              Name / email / id from user service
            </div>
          </Group>

          {/* Submit */}
          <Group position="right" style={{ marginTop: 8 }}>
            <Button
              type="submit"
              radius="md"
              disabled={submitting}
              onMouseEnter={handleBtnEnter}
              onMouseLeave={handleBtnLeave}
              style={{
                background: COLORS.emerald,
                color: "white",
                fontWeight: 700,
                padding: "10px 16px",
                border: "none",
              }}
            >
              {submitting ? <Loader size="xs" color="white" /> : "Save profile"}
            </Button>
          </Group>

          <Text
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.85)",
              marginTop: 8,
            }}
          >
            Need to update your account?{" "}
            <Link
              to="/support"
              style={{
                color: COLORS.emerald,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Contact support
            </Link>
          </Text>
        </Stack>
      </Paper>
    </div>
  );
}
