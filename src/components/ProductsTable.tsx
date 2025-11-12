import { memo } from 'react'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { products } from '@/data/dashboard'

export const ProductsTable = memo(function ProductsTable() {
  return (
    <Card className="p-6 shadow-none border-none rounded-2xl bg-[#F7F9FB] dark:bg-[#FFFFFF0D] border-border/50 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="inter-semibold text-sm text-foreground">
          Top Selling Products
        </h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b bg-transparent dark:border-[#FFFFFF33] border-[#1C1C1C33]">
            <TableHead className="text-[#1C1C1C66] dark:text-[#FFFFFF66] font-normal text-sm px-0 py-3">
              Name
            </TableHead>
            <TableHead className=" text-[#1C1C1C66] dark:text-[#FFFFFF66] font-normal text-sm px-2 py-3">
              Price
            </TableHead>
            <TableHead className=" text-[#1C1C1C66] dark:text-[#FFFFFF66] font-normal text-sm px-2 py-3">
              Quantity
            </TableHead>
            <TableHead className=" text-[#1C1C1C66] dark:text-[#FFFFFF66] font-normal text-sm px-0 py-3">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index} className="border-0 hover:bg-transparent">
              <TableCell className="font-normal text-foreground text-sm px-0 py-4">
                {product.name}
              </TableCell>
              <TableCell className="text-foreground font-normal text-sm px-2 py-4">
                ${product.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-foreground font-normal text-sm px-2 py-4">
                {product.quantity}
              </TableCell>
              <TableCell className="font-normal text-foreground text-sm px-0 py-4">
                $
                {product.amount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
})
