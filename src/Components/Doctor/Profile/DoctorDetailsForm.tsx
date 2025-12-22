import { useState } from "react";
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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import updateProfile, { getProfileData } from "../../../Services/ProfileService";
import {
  errorNotification,
  successNotification,
} from "../../../Utility/NotificationUtility";

import { useNavigate } from "react-router-dom";
import { addProfileDetails } from "../../../Slices/ProfileSlice";
import { departmentOptions } from "../../../utils/Constants";
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
  selectStyle,
} from "../../../utils/PredefinedCSS";

export default function DoctorProfileForm() {
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
    department:"",
    licenseNo: "",
    specialization: "",
    totalExp:""
  });

  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState<{ phone?: string; licenseNo?: string; specialization?: string; dob?: string }>(
    {}
  );

  function validatePhone(phone?: string) {
    if (!phone) return "Phone is required";
    if (!/^\d{10}$/.test(phone)) return "Phone must be 10 digits";
    return undefined;
  }

  function validateLicenseNo(licenseNo?: string) {
  if (!licenseNo) return "License number is required";
  const regex = /^[A-Za-z]{2,5}[\/\-]?[A-Za-z0-9]{3,10}$/;
  if (!regex.test(licenseNo)) return "License number isn't valid";
  return undefined;  
  } 


  function validateSpecialization(specialization?: string) {
    if (!specialization) return "Specialization is required";
    const regex = /^[A-Za-z ]{3,50}$/;
    if (!regex.test(specialization)) return "Specialization isn't valid";
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
    const licenseNoErr = validateLicenseNo(profileData.licenseNo);
    const specializationErr = validateSpecialization(profileData.specialization);
    const DobErr = validateDob(profileData.dob);

    if (phoneErr || licenseNoErr||specializationErr||DobErr)
      errorNotification("Please enter correct details");
    setErrors({ phone: phoneErr, licenseNo:licenseNoErr, specialization:specializationErr,dob:DobErr});

    const payload = {
      id: profileData.id,
      name: profileData.name,
      email: profileData.email,
      dob: profileData.dob,
      phone: profileData.phone,
      address: profileData.address,
      department: profileData.department,
      licenseNo: profileData.licenseNo,
      specialization: profileData.specialization,
      totalExp: profileData.totalExp,
    };

    try {
      console.log("payload", payload);
      await updateProfile(payload, token, user);
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
              <label style={labelStyle}>License Number</label>
              <input
                type="text"
                placeholder="MH12345"
                value={profileData.licenseNo ?? ""}
                onChange={(e) =>
                  setProfileData((p) => ({ ...p, licenseNo: e.target.value }))
                }
                required
                style={baseInputStyle}
                onBlur={() =>
                  setErrors((s) => ({
                    ...s,
                    aadhaarNo: validateLicenseNo(profileData.licenseNo),
                  }))
                }
              />
              {errors.licenseNo ? (
                <div style={errorStyle}>{errors.licenseNo}</div>
              ) : null}
            </div>

            <div style={colStyle}>
              <label style={labelStyle}>Department</label>
              <select
                value={profileData.department ?? ""}
                onChange={(e) =>
                  setProfileData((p) => ({ ...p, department: e.target.value }))
                }
                style={selectStyle}
              >
                <option value="">Select</option>
                {departmentOptions.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={rowStyle}>
            <div style={colStyle}>
              <label style={labelStyle}>Specialization</label>
              <input
                type="text"
                placeholder="Heart Surgeon"
                value={profileData.specialization ?? ""}
                onChange={(e) =>
                  setProfileData((p) => ({
                    ...p,
                    specialization: e.target.value,
                  }))
                }
                required
                style={baseInputStyle}
                onBlur={() =>
                  setErrors((s) => ({
                    ...s,
                    specialization: validateSpecialization(
                      profileData.specialization
                    ),
                  }))
                }
              />
              {errors.specialization ? (
                <div style={errorStyle}>{errors.specialization}</div>
              ) : null}
            </div>

            <div style={colStyle}>
              <label style={labelStyle}>Total Experience</label>
              <input
                type="tel"
                placeholder="0-60"
                value={profileData.totalExp ?? ""}
                onChange={(e) =>
                  setProfileData((p) => ({ ...p, totalExp: e.target.value }))
                }
                required
                style={baseInputStyle}
              />
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

          <Stack
            spacing="sm"
            style={{ marginBottom: 12, alignItems: "center" }}
          >
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
