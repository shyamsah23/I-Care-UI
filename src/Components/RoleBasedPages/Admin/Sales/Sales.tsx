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
  ActionIcon,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  IconPlus,
  IconChevronRight,
  IconChevronDown,
} from "@tabler/icons-react";
import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import {
  createSales,
  getAllSalesData,
  getAllSalesItemBySaleId,
  createMultipleSaleItem,
} from "../../../../Services/PharmacyService";
import { errorNotification } from "../../../../Utility/NotificationUtility";

const Sales = () => {
  const token = useSelector((state: any) => state.jwtSlice);

  const [salesList, setSalesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [addOpened, setAddOpened] = useState(false);
  const [expandedSaleId, setExpandedSaleId] = useState<number | null>(null);

  const [salesForm, setSalesForm] = useState({
    prescriptionId: 0,
    saleDate: null as any, 
    totalAmount: 0,
  });

  const [saleItems, setSaleItems] = useState([
    { medicineId: 0, batchNo: "", quantity: 0, unitPrice: 0 },
  ]);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const data = await getAllSalesData(token);
      setSalesList(data);
    } catch {
      errorNotification("Failed to fetch sales");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);


  const addItemRow = () => {
    setSaleItems([
      ...saleItems,
      { medicineId: 0, batchNo: "", quantity: 0, unitPrice: 0 },
    ]);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updated = [...saleItems];
    updated[index][field] = value;
    setSaleItems(updated);
  };


  const getISODate = (date: any) => {
    let d: Date;

    if (date instanceof Date) {
      d = date;
    } else {
      d = new Date(date);
    }

    if (isNaN(d.getTime())) {
      throw new Error("Invalid date");
    }

    return d.toISOString();
  };

  /* ================= CREATE ================= */

  const handleCreateSales = async () => {
    try {
      if (!salesForm.prescriptionId || !salesForm.saleDate) {
        errorNotification("Fill required fields");
        return;
      }

      const saleRes = await createSales(token, {
        prescriptionId: Number(salesForm.prescriptionId),
        saleDate: getISODate(salesForm.saleDate), 
        totalAmount: Number(salesForm.totalAmount),
      });

      const saleId =
        typeof saleRes === "number"
          ? saleRes
          : saleRes?.id || saleRes?.data?.id;

      if (!saleId) {
        console.log("SALE RESPONSE:", saleRes);
        errorNotification("Sale ID not returned");
        return;
      }

      const itemsPayload = saleItems.map((item) => ({
        saleId,
        medicineId: Number(item.medicineId),
        batchNo: item.batchNo,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
      }));

      await createMultipleSaleItem(token, itemsPayload);

      // reset
      setAddOpened(false);
      setSalesForm({
        prescriptionId: 0,
        saleDate: null,
        totalAmount: 0,
      });
      setSaleItems([{ medicineId: 0, batchNo: "", quantity: 0, unitPrice: 0 }]);

      fetchSales();
    } catch (error: any) {
      console.error("ERROR:", error);
      errorNotification(
        error?.response?.data?.errorMessage ||
          error.message ||
          "Failed to create sale",
      );
    }
  };

  
  return (
    <>
      <Card>
        <Group justify="space-between">
          <Text fw={700}>Sales</Text>
          <Button onClick={() => setAddOpened(true)}>
            <IconPlus size={16} /> Add Sale
          </Button>
        </Group>

        {loading ? (
          <Loader />
        ) : (
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th>Prescription</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Total</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {salesList.map((s) => (
                <Fragment key={s.id}>
                  <Table.Tr>
                    <Table.Td>
                      <ActionIcon
                        onClick={() =>
                          setExpandedSaleId(
                            expandedSaleId === s.id ? null : s.id,
                          )
                        }
                      >
                        {expandedSaleId === s.id ? (
                          <IconChevronDown size={16} />
                        ) : (
                          <IconChevronRight size={16} />
                        )}
                      </ActionIcon>
                    </Table.Td>

                    <Table.Td>{s.prescriptionId}</Table.Td>
                    <Table.Td>{s.saleDate}</Table.Td>
                    <Table.Td>₹ {s.totalAmount}</Table.Td>
                  </Table.Tr>

                  {expandedSaleId === s.id && (
                    <Table.Tr>
                      <Table.Td colSpan={4}>
                        <SaleItemsView saleId={s.id} token={token} />
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Fragment>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Card>

      <Modal
        opened={addOpened}
        onClose={() => setAddOpened(false)}
        title="Add Sale"
      >
        <NumberInput
          label="Prescription ID"
          value={salesForm.prescriptionId}
          onChange={(v) =>
            setSalesForm({ ...salesForm, prescriptionId: Number(v) })
          }
        />

        <DateInput
          label="Sale Date"
          value={salesForm.saleDate}
          onChange={(date) => setSalesForm({ ...salesForm, saleDate: date })}
          placeholder="Select date"
        />

        <NumberInput
          label="Total"
          value={salesForm.totalAmount}
          onChange={(v) =>
            setSalesForm({ ...salesForm, totalAmount: Number(v) })
          }
        />

        <Divider my="md" />

        <Text fw={600}>Sale Items</Text>

        {saleItems.map((item, i) => (
          <SimpleGrid cols={4} key={i}>
            <NumberInput
              value={item.medicineId}
              onChange={(v) => updateItem(i, "medicineId", v)}
              placeholder="Medicine ID"
            />
            <TextInput
              value={item.batchNo}
              onChange={(e) => updateItem(i, "batchNo", e.target.value)}
              placeholder="Batch"
            />
            <NumberInput
              value={item.quantity}
              onChange={(v) => updateItem(i, "quantity", v)}
              placeholder="Qty"
            />
            <NumberInput
              value={item.unitPrice}
              onChange={(v) => updateItem(i, "unitPrice", v)}
              placeholder="Price"
            />
          </SimpleGrid>
        ))}

        <Button mt="sm" onClick={addItemRow}>
          + Add Item
        </Button>

        <Button fullWidth mt="md" onClick={handleCreateSales}>
          Submit
        </Button>
      </Modal>
    </>
  );
};

const SaleItemsView = ({ saleId, token }:any) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllSalesItemBySaleId(token, saleId).then(setItems);
  }, [saleId]);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Medicine</Table.Th>
          <Table.Th>Batch</Table.Th>
          <Table.Th>Qty</Table.Th>
          <Table.Th>Price</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {items.map((i: any) => (
          <Table.Tr key={i.id}>
            <Table.Td>{i.medicineId}</Table.Td>
            <Table.Td>{i.batchNo}</Table.Td>
            <Table.Td>{i.quantity}</Table.Td>
            <Table.Td>{i.unitPrice}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default Sales;
