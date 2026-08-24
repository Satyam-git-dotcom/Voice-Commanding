import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="antialiased font-body-base bg-[#F4F1EA] text-[#111111] min-h-screen flex flex-col">
      <style dangerouslySetInnerHTML={{__html: `
        .bg-grid-lp {
            background-size: 8px 8px;
            background-image: linear-gradient(to right, rgba(17,17,17,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.1) 1px, transparent 1px);
        }
        .ticker-wrap {
            overflow: hidden;
            white-space: nowrap;
            box-sizing: border-box;
            border-bottom: 1px solid #111111;
            border-top: 1px solid #111111;
            background: #F4F1EA;
        }
        .ticker {
            display: inline-block;
            animation: ticker 20s linear infinite;
        }
        @keyframes ticker {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
        }
        .btn-brutal {
            transition: transform 0.1s;
        }
        .btn-brutal:active {
            transform: translate(2px, 2px);
        }
        .hover-invert:hover {
            background-color: #111111;
            color: #F4F1EA;
        }
      `}} />

      {/* Top AppBar */}
      <header className="w-full border-b border-[#111111] bg-[#F4F1EA] flex flex-col px-8 py-4 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-center w-full">
          <div className="font-display-lg text-6xl uppercase tracking-tighter text-[#111111]">QCART</div>
          <nav className="hidden md:flex gap-8 border border-[#111111] p-2 bg-[#F4F1EA]">
            <Link href="/app" className="text-[#111111] font-bold underline decoration-2 underline-offset-4 font-label-caps hover:bg-[#111111] hover:text-[#F4F1EA] transition-colors duration-100 px-4 py-2">ARCHIVE</Link>
            <Link href="/app" className="text-[#111111] font-label-caps hover:bg-[#111111] hover:text-[#F4F1EA] transition-colors duration-100 px-4 py-2">LOGISTICS</Link>
            <Link href="/app" className="text-[#111111] font-label-caps hover:bg-[#111111] hover:text-[#F4F1EA] transition-colors duration-100 px-4 py-2">CATEGORIES</Link>
          </nav>
          <div className="flex gap-4 hidden md:flex">
            <Link href="/app" className="border border-[#111111] p-2 hover:bg-[#111111] hover:text-[#F4F1EA] transition-colors duration-100 btn-brutal">
              LOGIN
            </Link>
            <Link href="/app" className="border border-[#111111] p-2 hover:bg-[#111111] hover:text-[#F4F1EA] transition-colors duration-100 btn-brutal bg-[#111111] text-[#F4F1EA]">
              START
            </Link>
          </div>
        </div>
      </header>

      {/* Breaking Trends Ticker */}
      <div className="ticker-wrap py-2 font-label-caps text-[#E02A2A] bg-grid-lp">
        <div className="ticker flex items-center">
          <span className="mx-4">[BREAKING] URBAN SUPPLY CHAINS OPTIMIZED</span>
          <span className="mx-4 text-[#111111]">•</span>
          <span className="mx-4">[ALERT] GROCERY COMMODITY PRICES FLUCTUATING</span>
          <span className="mx-4 text-[#111111]">•</span>
          <span className="mx-4">[TREND] VOCAL INTERFACES ADOPTION UP 42%</span>
          <span className="mx-4 text-[#111111]">•</span>
          <span className="mx-4">[LOGISTICS] WAREHOUSE 04 INVENTORY CRITICAL</span>
          <span className="mx-4 text-[#111111]">•</span>
          <span className="mx-4">[BREAKING] URBAN SUPPLY CHAINS OPTIMIZED</span>
          <span className="mx-4 text-[#111111]">•</span>
          <span className="mx-4">[ALERT] GROCERY COMMODITY PRICES FLUCTUATING</span>
          <span className="mx-4 text-[#111111]">•</span>
          <span className="mx-4">[TREND] VOCAL INTERFACES ADOPTION UP 42%</span>
        </div>
      </div>

      <main className="flex-grow flex flex-col w-full">
        {/* Hero Section */}
        <section className="border-b border-[#111111]">
          <div className="grid grid-cols-1 lg:grid-cols-12 border-[#111111] w-full max-w-[1440px] mx-auto">
            <div className="lg:col-span-8 lg:border-r border-[#111111] p-8 flex flex-col justify-center min-h-[600px] bg-[#F4F1EA] relative">
              <div className="absolute top-4 left-4 border border-[#111111] px-2 py-1 font-metadata bg-[#F4F1EA] z-10">ISSUE_001.VOL.1</div>
              <h1 className="font-display-lg text-[10vw] lg:text-[8vw] leading-[0.9] font-black uppercase tracking-tighter text-[#111111] mt-8 mb-6">
                THE FUTURE OF COMMERCE<br/>IS VOCAL
              </h1>
              <div className="border-l-4 border-[#E02A2A] pl-4 mb-8">
                <p className="font-headline-md text-2xl text-[#111111] max-w-2xl">
                  QCart Vol. 1 | Voice Command Shopping Assistant
                </p>
              </div>
              <div className="flex gap-4 mt-auto">
                <Link href="/app" className="bg-[#111111] text-[#F4F1EA] font-label-caps px-8 py-4 uppercase tracking-widest border border-[#111111] btn-brutal hover:bg-[#E02A2A] hover:border-[#E02A2A] transition-colors">
                  INITIALIZE SYSTEM
                </Link>
                <Link href="/app" className="hidden sm:block bg-[#F4F1EA] text-[#111111] font-label-caps px-8 py-4 uppercase tracking-widest border border-[#111111] btn-brutal hover:bg-[#111111] hover:text-[#F4F1EA] transition-colors">
                  READ MANIFESTO
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col bg-grid-lp relative border-t lg:border-t-0 border-[#111111]">
              <div className="h-full w-full min-h-[300px] border-b border-[#111111] relative">
                <img className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125" src="https://image.pollinations.ai/prompt/abstract%20brutalist%20microphone%203d%20render%20high%20contrast?width=600&height=800&nologo=true" alt="Hero Interface" />
              </div>
              <div className="p-6 bg-[#F4F1EA]">
                <div className="font-label-caps border-b border-[#111111] pb-2 mb-4 uppercase">System Status</div>
                <div className="flex justify-between items-center border-b border-[#111111] border-dashed pb-2 mb-2">
                  <span className="font-metadata">NLP ENGINE</span>
                  <span className="font-metadata text-[#E02A2A]">ONLINE</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#111111] border-dashed pb-2 mb-2">
                  <span className="font-metadata">LOGISTICS DB</span>
                  <span className="font-metadata text-[#111111]">SYNCED</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="font-metadata">LATENCY</span>
                  <span className="font-metadata text-[#111111]">12ms</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Columns */}
        <section className="border-b border-[#111111]">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="border-b md:border-b-0 md:border-r border-[#111111] p-8 flex flex-col hover-invert group transition-colors">
                <div className="font-display-lg text-4xl text-[#111111] group-hover:text-[#F4F1EA] mb-4 border-b border-[#111111] pb-4">01</div>
                <h2 className="font-headline-md text-2xl mb-6 uppercase">Natural Language Processing</h2>
                <p className="font-body-base text-justify flex-grow">
                  Our proprietary neural network digests complex conversational syntax, parsing intent, quantity, and brand preference with sub-second latency. Discard the GUI; command your inventory structurally and directly through localized vocal algorithms.
                </p>
                <div className="mt-8 border border-[#111111] p-2 font-metadata inline-block w-max group-hover:border-[#F4F1EA] uppercase">
                  [DATA_MODEL_V4.2]
                </div>
              </div>
              <div className="border-b md:border-b-0 md:border-r border-[#111111] p-8 flex flex-col hover-invert group transition-colors">
                <div className="font-display-lg text-4xl text-[#111111] group-hover:text-[#F4F1EA] mb-4 border-b border-[#111111] pb-4">02</div>
                <h2 className="font-headline-md text-2xl mb-6 uppercase">Smart Suggestions</h2>
                <p className="font-body-base text-justify flex-grow">
                  Predictive analytics utilizing historical ledger data to forecast required commodities before depletion occurs. The system anticipates structural deficits in your personal supply chain and proposes preemptive restocking protocols.
                </p>
                <div className="mt-8 border border-[#111111] p-2 font-metadata inline-block w-max group-hover:border-[#F4F1EA] uppercase">
                  [PREDICTIVE_ALGO]
                </div>
              </div>
              <div className="p-8 flex flex-col hover-invert group transition-colors">
                <div className="font-display-lg text-4xl text-[#111111] group-hover:text-[#F4F1EA] mb-4 border-b border-[#111111] pb-4">03</div>
                <h2 className="font-headline-md text-2xl mb-6 uppercase">Seamless Logistics</h2>
                <p className="font-body-base text-justify flex-grow">
                  Integration with regional distribution nodes ensures immediate dispatch. Cart data is serialized and transmitted securely, locking in market rates and prioritizing efficient geographical routing for physical delivery.
                </p>
                <div className="mt-8 border border-[#111111] p-2 font-metadata inline-block w-max group-hover:border-[#F4F1EA] uppercase">
                  [ROUTING_NODE_Z]
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Voice Feed Indicator */}
        <div className="fixed bottom-0 left-0 w-full bg-[#111111] border-t border-[#F4F1EA] z-50 p-2 flex items-center justify-between font-metadata">
          <div className="flex items-center gap-4">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E02A2A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E02A2A]"></span>
            </span>
            <span className="text-[#E02A2A] uppercase tracking-widest font-bold">SYSTEM READY</span>
          </div>
          <div className="text-[#F4F1EA] opacity-50 uppercase truncate max-w-lg hidden sm:block">
            &gt; AWAITING_VOCAL_INPUT_STREAM...
          </div>
          <Link href="/app" className="border border-[#F4F1EA] px-4 py-1 text-[#F4F1EA] hover:bg-[#F4F1EA] hover:text-[#111111] transition-colors btn-brutal">
            ACTIVATE MIC
          </Link>
        </div>
      </main>
    </div>
  );
}
