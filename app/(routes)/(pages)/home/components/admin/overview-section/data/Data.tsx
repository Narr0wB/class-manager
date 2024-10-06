import { PRENOTAZIONE_APPROVED, PRENOTAZIONE_PENDING, PRENOTAZIONE_REJECTED } from "@/lib/backend/admin"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: PRENOTAZIONE_PENDING,
    label: "In Approvazione",
    icon: CheckCircledIcon,
  },
  {
    value: PRENOTAZIONE_APPROVED,
    label: "Approvata",
    icon: CheckCircledIcon,
  },
  {
    value: PRENOTAZIONE_REJECTED,
    label: "Rifiutata",
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]
