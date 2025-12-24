import {
  Card,
  Table,
  Text,
  Group,
  Button,
  Modal,
  SimpleGrid,
  NumberInput,
  TextInput,
  Select,
  Badge,
  ActionIcon,
  Divider,
  Loader,
  Center,
} from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addMedicineInInventory,
  getAllMedicinesInInventory,
  updateMedicineInInventory,
} from "../../../Services/PharmacyService";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtility";

const Inventory = () => {
  const token = useSelector((state: any) => state.jwtSlice);

  const [inventoryList, setInventoryList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [addOpened, setAddOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);

  const [inventoryForm, setInventoryForm] = useState({
    id: null,
    medicineId: 0,
    batchNo: "",
    quantity: 0,
    initialQuantity: 0,
    expiryDate: "",
    status: "NOT_EXPIRED",
  });

  const resetForm = () => {
    setInventoryForm({
      id: null,
      medicineId: 0,
      batchNo: "",
      quantity: 0,
      initialQuantity: 0,
      expiryDate: "",
      status: "NOT_EXPIRED",
    });
  };

  /* ================= FETCH INVENTORY ================= */

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const data = await getAllMedicinesInInventory(token);
      setInventoryList(data);
    } catch (error: any) {
      errorNotification(
        error?.response?.data?.errorMessage || "Failed to fetch inventory data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [token]);

  /* ================= ADD INVENTORY ================= */

  const handleAddInventory = async () => {
    try {
      await addMedicineInInventory(token, {
        ...inventoryForm,
        initialQuantity: inventoryForm.quantity,
      });
      resetForm();
      await fetchInventory();
      setAddOpened(false);
      successNotification("Inventory added successfully");
    } catch (error: any) {
      errorNotification(
        error?.response?.data?.errorMessage || "Failed to add inventory"
      );
    }
  };

  /* ================= UPDATE INVENTORY ================= */

  const handleUpdateInventory = async () => {
    try {
      await updateMedicineInInventory(token, {
        id: inventoryForm.id,
        medicineId: inventoryForm.medicineId,
        batchNo: inventoryForm.batchNo,
        quantity: inventoryForm.quantity,
        initialQuantity: inventoryForm.initialQuantity,
        expiryDate: inventoryForm.expiryDate,
        status: inventoryForm.status,
      });
      resetForm();
      await fetchInventory();
      setAddOpened(false);
      successNotification("Inventory updated successfully");
    } catch (error: any) {
      errorNotification(
        error?.response?.data?.errorMessage || "Failed to update inventory"
      );
    }
  };

  

  /* ================= TABLE ================= */

  const rows = inventoryList.map((item: any) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.medicineId}</Table.Td>
      <Table.Td>{item.batchNo}</Table.Td>
      <Table.Td>{item.quantity}</Table.Td>
      <Table.Td>{item.initialQuantity}</Table.Td>
      <Table.Td>{item.expiryDate}</Table.Td>
      <Table.Td>{item.addedDate}</Table.Td>
      <Table.Td>
        <Badge color={item.status === "EXPIRED" ? "red" : "green"}>
          {item.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <ActionIcon
          variant="light"
          color="yellow"
          onClick={() => {
            setInventoryForm({
              id: item.id,
              medicineId: item.medicineId,
              batchNo: item.batchNo,
              quantity: item.quantity,
              initialQuantity: item.initialQuantity,
              expiryDate: item.expiryDate,
              status: item.status,
            });
            setEditOpened(true);
          }}
        >
          <IconEdit size={16} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Card shadow="md" radius="lg" p="lg">
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={700}>
            Medicine Inventory
          </Text>

          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => setAddOpened(true)}
          >
            Add Inventory
          </Button>
        </Group>

        {loading ? (
          <Center h={200}>
            <Loader />
          </Center>
        ) : inventoryList.length === 0 ? (
          <Center h={200}>
            <Text c="dimmed">No inventory records found</Text>
          </Center>
        ) : (
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Medicine ID</Table.Th>
                <Table.Th>Batch No</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Initial Qty</Table.Th>
                <Table.Th>Expiry Date</Table.Th>
                <Table.Th>Added Date</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}
      </Card>

      {/* ================= ADD INVENTORY MODAL ================= */}

      <Modal
        opened={addOpened}
        onClose={() => setAddOpened(false)}
        title="Add Medicine Inventory"
        size="lg"
        centered
      >
        <SimpleGrid cols={2}>
          <NumberInput
            label="Medicine ID"
            required
            value={inventoryForm.medicineId}
            onChange={(v) =>
              setInventoryForm({ ...inventoryForm, medicineId: Number(v) })
            }
          />

          <TextInput
            label="Batch No"
            required
            value={inventoryForm.batchNo}
            onChange={(e) =>
              setInventoryForm({ ...inventoryForm, batchNo: e.target.value })
            }
          />

          <NumberInput
            label="Quantity"
            required
            min={0}
            value={inventoryForm.quantity}
            onChange={(v) =>
              setInventoryForm({ ...inventoryForm, quantity: Number(v) })
            }
          />

          <TextInput
            label="Expiry Date"
            type="date"
            required
            value={inventoryForm.expiryDate}
            onChange={(e) =>
              setInventoryForm({ ...inventoryForm, expiryDate: e.target.value })
            }
          />

          <Select
            label="Stock Status"
            data={["EXPIRED", "NOT_EXPIRED"]}
            value={inventoryForm.status}
            onChange={(v) =>
              setInventoryForm({ ...inventoryForm, status: v || "NOT_EXPIRED" })
            }
            disabled
          />
        </SimpleGrid>

        <Divider my="lg" />

        <Group justify="flex-end">
          <Button variant="default" onClick={() => setAddOpened(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddInventory}>Add Inventory</Button>
        </Group>
      </Modal>

      {/* ================= UPDATE INVENTORY MODAL ================= */}

      <Modal
        opened={editOpened}
        onClose={() => setEditOpened(false)}
        title="Update Inventory"
        size="lg"
        centered
      >
        <SimpleGrid cols={2}>
          <NumberInput
            label="Medicine ID"
            value={inventoryForm.medicineId}
            onChange={(v) =>
              setInventoryForm({ ...inventoryForm, medicineId: Number(v) })
            }
          />

          <TextInput
            label="Batch No"
            value={inventoryForm.batchNo}
            onChange={(e) =>
              setInventoryForm({ ...inventoryForm, batchNo: e.target.value })
            }
          />

          <NumberInput
            label="Quantity"
            value={inventoryForm.quantity}
            onChange={(v) =>
              setInventoryForm({ ...inventoryForm, quantity: Number(v) })
            }
          />

          <NumberInput
            label="Initial Quantity"
            value={inventoryForm.initialQuantity}
            onChange={(v) =>
              setInventoryForm({
                ...inventoryForm,
                initialQuantity: Number(v),
              })
            }
          />

          <TextInput
            label="Expiry Date"
            type="date"
            value={inventoryForm.expiryDate}
            onChange={(e) =>
              setInventoryForm({ ...inventoryForm, expiryDate: e.target.value })
            }
          />

          <Select
            label="Stock Status"
            data={["EXPIRED", "NOT_EXPIRED"]}
            value={inventoryForm.status}
            onChange={(v) =>
              setInventoryForm({ ...inventoryForm, status: v || "NOT_EXPIRED" })
            }
          />
        </SimpleGrid>

        <Divider my="lg" />

        <Group justify="flex-end">
          <Button variant="default" onClick={() => setEditOpened(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdateInventory}>Update Inventory</Button>
        </Group>
      </Modal>
    </>
  );
};

export default Inventory;
