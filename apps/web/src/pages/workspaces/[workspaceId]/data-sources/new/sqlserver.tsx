import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import {
  CircleStackIcon,
  Cog8ToothIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { useCallback } from 'react'
import { useNewDataSource } from '@/hooks/useDatasource'
import { useStringQuery } from '@/hooks/useQueryArgs'
import SQLServerForm, {
  SQLServerDataSourceInput,
} from '@/components/forms/sqlserver'
import ScrollBar from '@/components/ScrollBar'
import { useSession } from '@/hooks/useAuth'

const pagePath = (workspaceId: string) => [
  { name: 'Configurations', icon: Cog8ToothIcon, href: '#', current: false },
  {
    name: 'Data sources',
    icon: CircleStackIcon,
    href: `/workspaces/${workspaceId}/data-sources`,
    current: false,
  },
  {
    name: 'Add SQLServer data source',
    icon: PlusCircleIcon,
    href: '#',
    current: true,
  },
]

export default function NewDataSourceSQLServerPage() {
  const router = useRouter()
  const workspaceId = useStringQuery('workspaceId')

  const newDataSource = useNewDataSource(workspaceId)

  const onSubmit = useCallback(
    async (data: SQLServerDataSourceInput) => {
      try {
        const ds = await newDataSource(data, 'sqlserver')
        if (ds.config.data.connStatus === 'offline') {
          router.push(
            `/workspaces/${workspaceId}/data-sources?offline=${ds.config.data.id}`
          )
        } else {
          router.push(`/workspaces/${workspaceId}/data-sources`)
        }
      } catch {
        alert('Something went wrong')
      }
    },
    [workspaceId]
  )

  const session = useSession({ redirectToLogin: true })
  if (!session.data) {
    return null
  }

  return (
    <Layout pagePath={pagePath(workspaceId)} hideOnboarding user={session.data}>
      <ScrollBar className="w-full overflow-auto">
        <SQLServerForm workspaceId={workspaceId} onSubmit={onSubmit} />
      </ScrollBar>
    </Layout>
  )
}
