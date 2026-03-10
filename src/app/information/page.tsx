export default function InformationPage() {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="bismillah">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text animate-gradient">
            Information Center
          </span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Organic Benefits */}
          <div className="p-8 rounded-xl bg-white/10 backdrop-blur-lg glow-border">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6">Benefits of Organic Chicken & Eggs</h2>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-xl font-bold text-white mb-2">🐔 Organic Chicken</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>No antibiotics or growth hormones</li>
                  <li>Higher omega-3 fatty acids content</li>
                  <li>Better living conditions for birds</li>
                  <li>More flavorful and tender meat</li>
                  <li>Environmentally sustainable farming</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-xl font-bold text-white mb-2">🥚 Organic Eggs</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Rich in vitamins A, E, and D</li>
                  <li>Higher levels of beta-carotene</li>
                  <li>Better omega-3 to omega-6 ratio</li>
                  <li>No pesticide residues</li>
                  <li>Richer yolk color and taste</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nutritional Value */}
          <div className="p-8 rounded-xl bg-white/10 backdrop-blur-lg glow-border">
            <h2 className="text-3xl font-bold text-pink-400 mb-6">Nutritional Value</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Eggs (per large egg)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/5">
                    <span className="text-yellow-400 font-bold">Calories</span>
                    <p className="text-white">72</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <span className="text-yellow-400 font-bold">Protein</span>
                    <p className="text-white">6.3g</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <span className="text-yellow-400 font-bold">Vitamin D</span>
                    <p className="text-white">44 IU</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <span className="text-yellow-400 font-bold">Choline</span>
                    <p className="text-white">147mg</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">Chicken Breast (100g)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/5">
                    <span className="text-pink-400 font-bold">Calories</span>
                    <p className="text-white">165</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <span className="text-pink-400 font-bold">Protein</span>
                    <p className="text-white">31g</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <span className="text-pink-400 font-bold">Fat</span>
                    <p className="text-white">3.6g</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <span className="text-pink-400 font-bold">Iron</span>
                    <p className="text-white">0.9mg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="p-8 rounded-xl bg-white/10 backdrop-blur-lg glow-border">
          <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "What is the difference between organic and regular eggs?",
                a: "Organic eggs come from chickens fed organic feed without pesticides, have access to outdoors, and are raised without antibiotics."
              },
              {
                q: "How long do incubated eggs take to hatch?",
                a: "Chicken eggs typically take 21 days to hatch under proper incubation conditions."
              },
              {
                q: "What temperature should I set my incubator?",
                a: "The ideal temperature for chicken eggs is 99.5°F (37.5°C) with 50-55% humidity."
              },
              {
                q: "How often should I turn the eggs?",
                a: "Eggs should be turned at least 3-5 times daily for the first 18 days of incubation."
              },
            ].map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5">
                <h3 className="font-bold text-yellow-400 mb-2">Q: {faq.q}</h3>
                <p className="text-gray-300">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}