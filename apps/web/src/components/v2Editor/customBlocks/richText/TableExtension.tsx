import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

export const CustomTable = Table.configure({
  resizable: true,
  HTMLAttributes: {
    class: 'briefer-table',
  },
})

export const CustomTableRow = TableRow.configure({
  HTMLAttributes: {
    class: 'briefer-table-row',
  },
})

export const CustomTableHeader = TableHeader.configure({
  HTMLAttributes: {
    class: 'briefer-table-header',
  },
})

export const CustomTableCell = TableCell.configure({
  HTMLAttributes: {
    class: 'briefer-table-cell',
  },
}) 