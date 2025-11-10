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
    <Card className="p-6 rounded-2xl bg-[#F7F9FB] dark:bg-[#FFFFFF0D] border-border/50 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-foreground">
          Top Selling Products
        </h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground font-normal text-base px-0 py-3">
              Name
            </TableHead>
            <TableHead className="text-right text-muted-foreground font-normal text-base px-2 py-3">
              Price
            </TableHead>
            <TableHead className="text-right text-muted-foreground font-normal text-base px-2 py-3">
              Quantity
            </TableHead>
            <TableHead className="text-right text-muted-foreground font-normal text-base px-0 py-3">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index} className="border-0 hover:bg-transparent">
              <TableCell className="font-normal text-foreground text-base px-0 py-3">
                {product.name}
              </TableCell>
              <TableCell className="text-right text-foreground font-normal text-base px-2 py-3">
                ${product.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-right text-foreground font-normal text-base px-2 py-3">
                {product.quantity}
              </TableCell>
              <TableCell className="text-right font-normal text-foreground text-base px-0 py-3">
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
