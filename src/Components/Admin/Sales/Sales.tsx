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
  Divider,
  Loader,
  Center,
  ActionIcon,
  Badge,
} from "@mantine/core";
import {
  IconEdit,
  IconPlus,
  IconChevronRight,
  IconChevronDown,
} from "@tabler/icons-react";
import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import {
  createSales,
  getAllSalesData,
  updateSales,
  getAllSalesItemBySaleId,
} from "../../../Services/PharmacyService";
import { errorNotification } from "../../../Utility/NotificationUtility";

/* ================= COMPONENT ================= */

const Sales = () => {
  const token = useSelector((state: any) => state.jwtSlice);

  const [salesList, setSalesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [addOpened, setAddOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);

  const [expandedSaleId, setExpandedSaleId] = useState<number | null>(null);
  const [saleItemsMap, setSaleItemsMap] = useState<Record<number, any[]>>({});
  const [saleItemsLoading, setSaleItemsLoading] = useState<number | null>(null);

  const [salesForm, setSalesForm] = useState({
    id: null,
    prescriptionId: 0,
    saleDate: "",
    totalAmount: 0,
  });

  /* ================= FETCH SALES ================= */

  const fetchSales = async () => {
    try {
      setLoading(true);
      const data = await getAllSalesData(token);
      setSalesList(data);
    } catch (error: any) {
      errorNotification(
        error?.response?.data?.errorMessage || "Failed to fetch sales data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [token]);

  /* ================= LAZY LOAD SALE ITEMS ================= */

  const fetchSaleItems = async (saleId: number) => {
    if (saleItemsMap[saleId]) return;

    try {
      setSaleItemsLoading(saleId);
      const items = await getAllSalesItemBySaleId(token, saleId);
      setSaleItemsMap((prev) => ({ ...prev, [saleId]: items }));
    } catch (error: any) {
      errorNotification(
        error?.response?.data?.errorMessage || "Failed to fetch sale items"
      );
    } finally {
      setSaleItemsLoading(null);
    }
  };

  /* ================= CREATE SALES ================= */

  const handleCreateSales = async () => {
    try {
      await createSales(token, {
        prescriptionId: salesForm.prescriptionId,
        saleDate: salesForm.saleDate,
        totalAmount: salesForm.totalAmount,
      });
      setAddOpened(false);
      resetForm();
      fetchSales();
    } catch (error: any) {
      errorNotification(
        error?.response?.data?.errorMessage || "Failed to create sales"
      );
    }
  };

  /* ================= UPDATE SALES ================= */

  const handleUpdateSales = async () => {
    try {
      await updateSales(token, {
        id: salesForm.id,
        prescriptionId: salesForm.prescriptionId,
        saleDate: salesForm.saleDate,
        totalAmount: salesForm.totalAmount,
      });
      setEditOpened(false);
      resetForm();
      fetchSales();
    } catch (error: any) {
      errorNotification(
        error?.response?.data?.errorMessage || "Failed to update sales"
      );
    }
  };

  const resetForm = () => {
    setSalesForm({
      id: null,
      prescriptionId: 0,
      saleDate: "",
      totalAmount: 0,
    });
  };

  /* ================= TABLE ROWS ================= */

  const rows = salesList.map((item: any) => {
    const isExpanded = expandedSaleId === item.id;
    const saleItems = saleItemsMap[item.id] || [];

    return (
      <Fragment key={item.id}>
        {/* ===== MAIN SALE ROW ===== */}
        <Table.Tr>
          <Table.Td width={40}>
            <ActionIcon
              variant="subtle"
              onClick={() => {
                if (isExpanded) {
                  setExpandedSaleId(null);
                } else {
                  setExpandedSaleId(item.id);
                  fetchSaleItems(item.id);
                }
              }}
            >
              {isExpanded ? (
                <IconChevronDown size={16} />
              ) : (
                <IconChevronRight size={16} />
              )}
            </ActionIcon>
          </Table.Td>

          <Table.Td>{item.prescriptionId}</Table.Td>
          <Table.Td>{item.saleDate}</Table.Td>
          <Table.Td>
            <Badge color="green">₹ {item.totalAmount}</Badge>
          </Table.Td>

          <Table.Td>
            <ActionIcon
              variant="light"
              color="yellow"
              onClick={() => {
                setSalesForm({
                  id: item.id,
                  prescriptionId: item.prescriptionId,
                  saleDate: item.saleDate,
                  totalAmount: item.totalAmount,
                });
                setEditOpened(true);
              }}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Table.Td>
        </Table.Tr>

        {/* ===== EXPANDED SALE ITEMS ===== */}
        {isExpanded && (
          <Table.Tr>
            <Table.Td colSpan={5} bg="gray.0">
              {saleItemsLoading === item.id ? (
                <Center>
                  <Loader size="sm" />
                </Center>
              ) : saleItems.length === 0 ? (
                <Text size="sm" c="dimmed">
                  No sale items found
                </Text>
              ) : (
                <Table striped withTableBorder mt="sm">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Medicine ID</Table.Th>
                      <Table.Th>Batch No</Table.Th>
                      <Table.Th>Quantity</Table.Th>
                      <Table.Th>Unit Price</Table.Th>
                      <Table.Th>Total</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {saleItems.map((si: any) => (
                      <Table.Tr
                        key={`${si.saleId}-${si.medicineId}-${si.batchNo}`}
                      >
                        <Table.Td>{si.medicineId}</Table.Td>
                        <Table.Td>{si.batchNo}</Table.Td>
                        <Table.Td>{si.quantity}</Table.Td>
                        <Table.Td>₹ {si.unitPrice}</Table.Td>
                        <Table.Td>₹ {si.quantity * si.unitPrice}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              )}
            </Table.Td>
          </Table.Tr>
        )}
      </Fragment>
    );
  });

  return (
    <>
      <Card shadow="md" radius="lg" p="lg">
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={700}>
            Pharmacy Sales
          </Text>

          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => setAddOpened(true)}
          >
            Add Sale
          </Button>
        </Group>

        {loading ? (
          <Center h={200}>
            <Loader />
          </Center>
        ) : salesList.length === 0 ? (
          <Center h={200}>
            <Text c="dimmed">No sales records found</Text>
          </Center>
        ) : (
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th>Prescription ID</Table.Th>
                <Table.Th>Sale Date</Table.Th>
                <Table.Th>Total Amount</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}
      </Card>

      {/* ================= ADD SALE MODAL ================= */}

      <Modal
        opened={addOpened}
        onClose={() => setAddOpened(false)}
        title="Add Sale"
        size="lg"
        centered
      >
        <SimpleGrid cols={2}>
          <NumberInput
            label="Prescription ID"
            required
            value={salesForm.prescriptionId}
            onChange={(v) =>
              setSalesForm({ ...salesForm, prescriptionId: Number(v) })
            }
          />

          <TextInput
            label="Sale Date"
            type="datetime-local"
            required
            value={salesForm.saleDate}
            onChange={(e) =>
              setSalesForm({ ...salesForm, saleDate: e.target.value })
            }
          />

          <NumberInput
            label="Total Amount"
            required
            min={0}
            value={salesForm.totalAmount}
            onChange={(v) =>
              setSalesForm({ ...salesForm, totalAmount: Number(v) })
            }
          />
        </SimpleGrid>

        <Divider my="lg" />

        <Group justify="flex-end">
          <Button variant="default" onClick={() => setAddOpened(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateSales}>Add Sale</Button>
        </Group>
      </Modal>

      {/* ================= UPDATE SALE MODAL ================= */}

      <Modal
        opened={editOpened}
        onClose={() => setEditOpened(false)}
        title="Update Sale"
        size="lg"
        centered
      >
        <SimpleGrid cols={2}>
          <NumberInput
            label="Prescription ID"
            value={salesForm.prescriptionId}
            onChange={(v) =>
              setSalesForm({ ...salesForm, prescriptionId: Number(v) })
            }
          />

          <TextInput
            label="Sale Date"
            type="datetime-local"
            value={salesForm.saleDate}
            onChange={(e) =>
              setSalesForm({ ...salesForm, saleDate: e.target.value })
            }
          />

          <NumberInput
            label="Total Amount"
            min={0}
            value={salesForm.totalAmount}
            onChange={(v) =>
              setSalesForm({ ...salesForm, totalAmount: Number(v) })
            }
          />
        </SimpleGrid>

        <Divider my="lg" />

        <Group justify="flex-end">
          <Button variant="default" onClick={() => setEditOpened(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdateSales}>Update Sale</Button>
        </Group>
      </Modal>
    </>
  );
};

export default Sales;
