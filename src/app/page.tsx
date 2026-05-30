import CampaignSlider from '@/components/bento/CampaignSlider'
import BentoGrid from '@/components/bento/BentoGrid'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section for Slider */}
        <div className="mb-8">
          <h1 className="sr-only">Peka Peduli Sulawesi - Portal Kemanusiaan</h1>
        </div>

        {/* Hero Slider Component */}
        <section aria-label="Kampanye Darurat" className="mb-6">
          <CampaignSlider />
        </section>

        {/* Bento Grid Component */}
        <section aria-label="Informasi dan Statistik Kemanusiaan">
          <BentoGrid />
        </section>
        
      </div>
    </div>
  )
}
