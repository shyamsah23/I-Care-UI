import { useState, useEffect } from "react";
import {
  Avatar,
  Card,
  Text,
  Badge,
  Divider,
  Modal,
  TextInput,
  Textarea,
  Button,
  Group,
  Skeleton,
  ActionIcon,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  IconCalendar,
  IconPhone,
  IconId,
  IconDroplet,
  IconEdit,
  IconX,
} from "@tabler/icons-react";
import updateProfile from "../../../Services/ProfileService";
import { addProfileDetails } from "../../../Slices/ProfileSlice";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtility";

const PatientProfile = () => {
  const token = useSelector((state: any) => state.jwtSlice);
  const user = useSelector((state: any) => state.userSlice);
  const profile = useSelector((state: any) => state.profileSlice);
  const dispatch = useDispatch();
  const { role, sub } = user?.decoded;
  const { id,dob, aadhaarNo, phone, address, bloodGroup, email } = profile?.items;
  console.log(profile?.items);

  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  // const [editable, setEditable] = useState<any>({ dob:dob, aadhaarNo:aadhaarNo, phone:phone, address:address, bloodGroup:bloodGroup, name: sub });
  const [profileData, setProfileData] = useState({ dob:dob, aadhaarNo:aadhaarNo, phone:phone, address:address, bloodGroup:bloodGroup, name: sub });


  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      console.log("after",profileData)
      setProfileData({ dob, aadhaarNo, phone, address, bloodGroup, name: sub });
      setLoading(false);
    }, 300); 
   
    return () => clearTimeout(t);
  }, []);
  // useEffect(() => {}, [profileData]);

  const payload = {
    id: id,
    name: profileData.name,
    email: email,
    dob: profileData.dob,
    phone: profileData.phone,
    address: profileData.address,
    aadhaarNo: profileData.aadhaarNo,
    bloodGroup: profileData.bloodGroup,
  };
  
    const handleUpdate = async () => {
      try {
        await updateProfile(payload, token, user);
        // dispatch(addProfileDetails());
        console.log("Profile updated:");
        successNotification("Profile Created Successfully");
        setOpened(false);
      } catch (error: any) {
        console.error("Profile creation error:", error);
        errorNotification(
          error?.response?.data?.errorMessage || "Failed to save profile"
        );
      }
  }
 
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 via-indigo-50 to-pink-50 flex items-start justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-5xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Profile card */}
          <Card shadow="xl" radius="xl" padding="xl" className="bg-white/90">
            <div className="flex flex-col items-center gap-3">
              <Skeleton visible={loading} radius="xl">
                <Avatar src="/myAvatar.png" size={140} radius="xl" />
              </Skeleton>

              <div className="text-center">
                <Skeleton visible={loading} height={24} width={220} radius="sm">
                  <Text size="xl" fw={700} className="text-slate-800">
                    {sub || "Patient Name"}
                  </Text>
                </Skeleton>

                <Skeleton
                  visible={loading}
                  height={16}
                  width={200}
                  mt={6}
                  radius="sm"
                >
                  <Text size="sm" className="text-gray-500">
                    {email}
                  </Text>
                </Skeleton>

                <div className="mt-3">
                  <Badge radius="xl" size="md" variant="filled" color="indigo">
                    {role?.toLowerCase() || "patient"}
                  </Badge>
                </div>
              </div>

              <Divider my="md" />

              <div className="w-full space-y-3">
                <FieldRow
                  label="Date of Birth"
                  value={dob}
                  icon={<IconCalendar size={18} />}
                  loading={loading}
                  colorClass="text-blue-600"
                />

                <FieldRow
                  label="Aadhaar"
                  value={aadhaarNo}
                  icon={<IconId size={18} />}
                  loading={loading}
                  colorClass="text-purple-600"
                />

                <FieldRow
                  label="Blood Group"
                  value={bloodGroup}
                  icon={<IconDroplet size={18} />}
                  loading={loading}
                  colorClass="text-rose-600"
                />

                <FieldRow
                  label="Phone"
                  value={phone}
                  icon={<IconPhone size={18} />}
                  loading={loading}
                  colorClass="text-emerald-600"
                />

                <div className="flex justify-between items-center mt-2">
                  <Button variant="outline" onClick={() => setOpened(true)}>
                    Edit Profile
                  </Button>

                  <div className="text-sm text-gray-500">
                    Last updated: <span className="font-medium">Recently</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Right column: Details and actions (span 2 cols on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <Card shadow="lg" radius="xl" padding="xl" className="bg-white/95">
              <div className="flex items-center justify-between">
                <div>
                  <Text size="lg" fw={700} className="text-slate-800">
                    Personal Details
                  </Text>
                  <Text size="sm" className="text-gray-500 mt-1">
                    A quick overview of patient information and contact details.
                  </Text>
                </div>

                <Group spacing={8}>
                  <ActionIcon variant="light" radius="md">
                    <IconEdit size={18} />
                  </ActionIcon>
                  <ActionIcon radius="md" variant="light">
                    {/* <IconFloppyDisk size={18} /> */}
                  </ActionIcon>
                </Group>
              </div>

              <Divider my="md" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard title="Contact" className="p-4">
                  <div className="flex flex-col gap-2">
                    <KeyVal label="Phone" value={phone} loading={loading} />
                    <KeyVal label="Email" value={email} loading={loading} />
                    <KeyVal
                      label="Address"
                      value={address}
                      loading={loading}
                      multiline
                    />
                  </div>
                </InfoCard>

                <InfoCard title="Medical" className="p-4">
                  <div className="flex flex-col gap-2">
                    <KeyVal
                      label="Blood Group"
                      value={bloodGroup}
                      loading={loading}
                    />
                    <KeyVal
                      label="Date of Birth"
                      value={dob}
                      loading={loading}
                    />
                    <KeyVal
                      label="Aadhaar"
                      value={aadhaarNo}
                      loading={loading}
                    />
                  </div>
                </InfoCard>
              </div>
            </Card>

            {/* Small actions / history */}
            <Card shadow="sm" radius="lg" padding="lg" className="bg-white/95">
              <div className="flex items-center justify-between">
                <Text fw={700}>Activity</Text>
                <Text size="sm" className="text-gray-500">
                  View full activity
                </Text>
              </div>

              <Divider my="sm" />

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">Profile created</div>
                  <div className="text-sm text-gray-500">2 days ago</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">Last login</div>
                  <div className="text-sm text-gray-500">Today</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        radius="lg"
        size="lg"
      >
        <div className="flex items-center justify-between mb-4">
          <Text fw={700}>Edit Profile</Text>
          <ActionIcon onClick={() => setOpened(false)}>
            <IconX size={18} />
          </ActionIcon>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Full name"
            value={profileData?.name || ""}
            onChange={(e) =>
              setProfileData((p: any) => ({ ...p, name: e.target.value }))
            }
          />

          <TextInput
            label="Phone"
            value={profileData?.phone || ""}
            onChange={(e) =>
              setProfileData((p: any) => ({ ...p, phone: e.target.value }))
            }
          />

          <TextInput
            label="Aadhaar"
            value={profileData?.aadhaarNo || ""}
            onChange={(e) =>
              setProfileData((p: any) => ({
                ...p,
                aadhaarNo: e.target.value,
              }))
            }
          />

          <TextInput
            label="Blood group"
            value={profileData?.bloodGroup || ""}
            onChange={(e) =>
              setProfileData((p: any) => ({
                ...p,
                bloodGroup: e.target.value,
              }))
            }
          />

          <Textarea
            label="Address"
            value={profileData?.address || ""}
            onChange={(e) =>
              setProfileData((p: any) => ({ ...p, address: e.target.value }))
            }
            className="md:col-span-2"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="default" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Save changes</Button>
        </div>
      </Modal>
    </div>
  );
};

/* ---------- Small helper components ---------- */

const FieldRow = ({ label, value, icon, loading, colorClass }: any) => (
  <div className="flex items-start gap-3">
    <div className={`p-2 rounded-full bg-gray-100 shadow-sm ${colorClass}`}>
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <Text size="sm" className="text-gray-500">
          {label}
        </Text>
      </div>
      <Skeleton visible={loading} height={18} width={180} radius="sm">
        <Text size="md" fw={600} className="text-slate-800">
          {value || "—"}
        </Text>
      </Skeleton>
    </div>
  </div>
);

const InfoCard = ({ children, title, className = "" }: any) => (
  <div className={`border rounded-xl bg-white p-4 ${className}`}>
    <Text fw={700} className="mb-3">
      {title}
    </Text>
    {children}
  </div>
);

const KeyVal = ({ label, value, loading, multiline }: any) => (
  <div>
    <Text size="xs" className="text-gray-500">
      {label}
    </Text>
    <Skeleton visible={loading} height={18} width={220} radius="sm">
      <Text size="sm" fw={600} className="text-slate-700 break-words">
        {value || "—"}
      </Text>
    </Skeleton>
  </div>
);

export default PatientProfile;
