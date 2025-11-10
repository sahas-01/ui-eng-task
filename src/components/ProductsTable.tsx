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
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Top Selling Products
        </h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="text-right font-semibold">Price</TableHead>
            <TableHead className="text-right font-semibold">Quantity</TableHead>
            <TableHead className="text-right font-semibold">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow
              key={index}
              className="group hover:bg-accent/30 transition-colors"
            >
              <TableCell className="font-medium text-foreground">
                {product.name}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                ${product.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {product.quantity}
              </TableCell>
              <TableCell className="text-right font-medium text-foreground">
                ${product.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
})
