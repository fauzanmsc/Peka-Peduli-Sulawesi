import { createClient } from '@/utils/supabase/server'
import DashboardClient from './DashboardClient'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch donations sum
  const { data: donations } = await supabase.from('donations').select('amount').eq('payment_status', 'SUCCESS')
  const totalAmount = donations?.reduce((sum, item) => sum + Number(item.amount), 0) || 0

  // Fetch campaigns count
  const { count: campaignsCount } = await supabase.from('campaigns').select('*', { count: 'exact', head: true })
  
  // Fetch urgent campaigns count
  const { count: urgentCount } = await supabase.from('campaigns').select('*', { count: 'exact', head: true }).eq('is_urgent', true)

  // Fetch volunteers count
  const { count: volunteersCount } = await supabase.from('volunteer_profiles').select('*', { count: 'exact', head: true })

  const stats = {
    totalDonations: totalAmount,
    totalCampaigns: campaignsCount || 0,
    totalVolunteers: volunteersCount || 0,
    urgentCampaigns: urgentCount || 0
  }

  return <DashboardClient stats={stats} />
}
