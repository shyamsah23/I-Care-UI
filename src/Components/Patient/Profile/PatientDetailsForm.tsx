import {useState } from "react";
import {
  Button,
  Checkbox,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import updateProfile, { getProfileData } from "../../../Services/ProfileService";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtility";
import {
  COLORS,
  baseInputStyle,
  handleBtnEnter,
  handleBtnLeave,
  paperStyle,
  headerTitleStyle,
  labelStyle,
  errorStyle,
  rowStyle,
  colStyle,
  selectStyle
} from "../../../utils/PredefinedCSS";
import { bloodGroupOptions } from "../../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { addProfileDetails } from "../../../Slices/ProfileSlice";

export default function PatientProfileForm() {
  const token = useSelector((state: any) => state.jwtSlice).toString();
  const user = useSelector((state: any) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const [profileData, setProfileData] = useState({
    id: user?.decoded?.profileId,
    name: user?.decoded?.sub,
    email: user?.decoded?.emailId,
    dob: "",
    phone: "",
    address: "",
    aadhaarNo: "",
    bloodGroup: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState<{ phone?: string; aadhaarNo?: string; dob?: string }>({});

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
  
  function validateDob(dob?: string) {
    if (!dob) return "DOB is required";
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

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneErr = validatePhone(profileData.phone);
    const aadhaarErr = validateAadhaar(profileData.aadhaarNo);
    const DobErr = validateDob(profileData.dob);

    if (phoneErr || aadhaarErr)
      errorNotification("Please enter correct details");
    setErrors({ phone: phoneErr, aadhaarNo: aadhaarErr, dob:DobErr});
    
    const payload = {
      id: profileData.id,
      name: profileData.name,
      email: profileData.email,
      dob: profileData.dob,
      phone: profileData.phone,
      address: profileData.address,
      aadhaarNo: profileData.aadhaarNo,
      bloodGroup: profileData.bloodGroup,
    };
 
    try {
      console.log("payload", payload);
      await updateProfile(payload, token,user);
      setSubmitting(true);
      dispatch(addProfileDetails(payload));
      console.log("Profile created:");
      successNotification("Profile Created Successfully");
      navigate("/");
    } catch (error: any) {
      console.error("Profile creation error:", error);
      errorNotification(
        error?.response?.data?.errorMessage || "Failed to save profile"
      );
    } finally {
      setSubmitting(false);
    }
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
            Create your profile
          </Text>
        </Stack>

        <Stack spacing="sm">
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

          <Group position="apart" style={{ marginTop: 6 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Checkbox checked={false} onChange={() => {}} />
              <div style={{ color: "rgba(255,255,255,0.9)" }}>
                Save on this device
              </div>
            </div>
          </Group>

          <Stack spacing="sm" style={{ marginBottom: 12, alignItems: "center" }}>
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
                maxWidth: "150px",
              }}
            >
              {submitting ? <Loader size="xs" color="white" /> : "Save profile"}
            </Button>
            </Stack>

          <Text
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.85)",
              marginTop: 8,
            }}
          >
            Create Profile later?{" "}
            <Link
              to="/"
              style={{
                color: COLORS.emerald,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Home Page
            </Link>
          </Text>
        </Stack>
      </Paper>
    </div>
  );
}
