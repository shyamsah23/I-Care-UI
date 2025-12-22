import {
  Card,
  Table,
  Text,
  Group,
  ActionIcon,
  Badge,
  Loader,
  Center,
  Button,
  Modal,
  Divider,
  SimpleGrid,
  TextInput,
  PasswordInput,
  Select,
} from "@mantine/core";
import { IconEdit, IconTrash, IconEye } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import updateProfile, { getAllDoctors_Patients } from "../../Services/ProfileService";
import { errorNotification, successNotification } from "../../Utility/NotificationUtility";
import { signupUser } from "../../Services/UserService";

const GetListOfAllDoctors_Patients = async (type: string, token: any) => {
  try {
    return await getAllDoctors_Patients(type, token);
  } catch (error: any) {
    errorNotification(
      error?.response?.data?.errorMessage || "Failed to fetch data"
    );
    return [];
  }
};

export const GetAllDoctors_Patients = ({ type }: { type: string }) => {
  const token = useSelector((state: any) => state.jwtSlice);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // View modal
  const [viewOpened, setViewOpened] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  // Create user modal
  const [createOpened, setCreateOpened] = useState(false);
  // const [userCreated, setUserCreated] = useState(false);

  const [userForm, setUserForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: type === "doctor" ? "DOCTOR" : "PATIENT",
  });
 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await GetListOfAllDoctors_Patients(type, token);
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [type, token, createOpened]);

  const openViewModal = (item: any) => {
    setSelected(item);
    setViewOpened(true);
  };
  
  const handleCreateUser = async () => {
    try {
      await signupUser(userForm);
      successNotification("User created successfully");
      // setUserCreated(true);
      setUserForm({
        username: "",
        name: "",
        email: "",
        password: "",
        role: type === "doctor" ? "DOCTOR" : "PATIENT",
      });
      setCreateOpened(false);
    } catch (error: any) {
      errorNotification(
        error?.response?.data?.errorMessage || "User creation failed"
      );
    }
  };

  // const handleCreateProfile = async() => {
  //   try {
  //     await updateProfile()
  //   } catch {
      
  //   }
  // };

  const rows = data.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.email}</Table.Td>
      <Table.Td>{item.phone}</Table.Td>

      <Table.Td>
        {type === "patient" ? (
          <Badge color="red">{item.bloodGroup || "N/A"}</Badge>
        ) : (
          <Text fw={500}>{item.licenseNo}</Text>
        )}
      </Table.Td>

      <Table.Td>
        <Group gap="xs">
          <ActionIcon
            variant="light"
            color="blue"
            onClick={() => openViewModal(item)}
          >
            <IconEye size={16} />
          </ActionIcon>

          <ActionIcon variant="light" color="yellow">
            <IconEdit size={16} />
          </ActionIcon>

          <ActionIcon variant="light" color="red">
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Card shadow="md" radius="lg" p="lg">
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={700}>
            {type === "doctor" ? "Doctors List" : "Patients List"}
          </Text>

          <Button size="sm" onClick={() => setCreateOpened(true)}>
            Add {type === "doctor" ? "Doctor" : "Patient"}
          </Button>
        </Group>

        {loading ? (
          <Center h={200}>
            <Loader />
          </Center>
        ) : data.length === 0 ? (
          <Center h={200}>
            <Text c="dimmed">No records found</Text>
          </Center>
        ) : (
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th>
                  {type === "patient" ? "Blood Group" : "License No"}
                </Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}
      </Card>

      {/* ================= VIEW MODAL ================= */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title="Details"
        size="lg"
        centered
      >
        {selected && (
          <>
            <Text fw={600} mb="sm">
              Personal Information
            </Text>

            <SimpleGrid cols={2}>
              <Text>Name: {selected.name}</Text>
              <Text>Email: {selected.email}</Text>
              <Text>Phone: {selected.phone}</Text>
              <Text>DOB: {selected.dob || "N/A"}</Text>
              <Text>Address: {selected.address || "N/A"}</Text>
            </SimpleGrid>

            <Divider my="md" />

            {type === "patient" ? (
              <>
                <Text fw={600} mb="sm">
                  Medical Details
                </Text>
                <SimpleGrid cols={2}>
                  <Text>Blood Group: {selected.bloodGroup}</Text>
                  <Text>Aadhaar No: {selected.aadhaarNo || "N/A"}</Text>
                </SimpleGrid>
              </>
            ) : (
              <>
                <Text fw={600} mb="sm">
                  Professional Details
                </Text>
                <SimpleGrid cols={2}>
                  <Text>License No: {selected.licenseNo}</Text>
                  <Text>
                    Specialization: {selected.specialization || "N/A"}
                  </Text>
                  <Text>Department: {selected.department || "N/A"}</Text>
                  <Text>
                    Total Experience: {selected.totalExp || "N/A"} yrs
                  </Text>
                </SimpleGrid>
              </>
            )}
          </>
        )}
      </Modal>

      {/* ================= CREATE USER MODAL ================= */}
      <Modal
        opened={createOpened}
        onClose={() => {
          setCreateOpened(false);
          // setUserCreated(false);
        }}
        title={`Create ${type === "doctor" ? "Doctor" : "Patient"} User`}
        size="lg"
        centered
      >
        <Text c="dimmed" size="sm" mb="md">
          Create a user account before completing the profile
        </Text>

        <SimpleGrid cols={2} spacing="md">
          <TextInput
            label="Username"
            required
            value={userForm.username}
            onChange={(e) =>
              setUserForm({ ...userForm, username: e.target.value })
            }
          />

          <TextInput
            label="Full Name"
            required
            value={userForm.name}
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
          />

          <TextInput
            label="Email"
            required
            value={userForm.email}
            onChange={(e) =>
              setUserForm({ ...userForm, email: e.target.value })
            }
          />

          <PasswordInput
            label="Password"
            required
            value={userForm.password}
            onChange={(e) =>
              setUserForm({ ...userForm, password: e.target.value })
            }
          />

          <Select
            label="Role"
            value={userForm.role}
            data={[
              { value: "DOCTOR", label: "Doctor" },
              { value: "PATIENT", label: "Patient" },
            ]}
            disabled
          />
        </SimpleGrid>

        <Divider my="lg" />

        <Group justify="flex-end">
          <Button variant="default" onClick={() => setCreateOpened(false)}>
            Close
          </Button>
          <Button onClick={handleCreateUser}>Create User</Button>
          {/* {!userCreated ? (
            <Button onClick={handleCreateUser}>Create User</Button>
          ) : (
            <> */}
          {/* <Button variant="outline" onClick={() => setCreateOpened(false)}>
                Create Profile Later
              </Button>
              <Button onClick={handleCreateProfile}>Create Profile Now</Button> */}
          {/* </>
          )} */}
        </Group>
      </Modal>
    </>
  );
};
