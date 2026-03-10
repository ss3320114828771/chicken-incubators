export default function DirectionsPage() {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="bismillah">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text animate-gradient">
            Directions
          </span>
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Map */}
          <div className="h-[500px] rounded-xl overflow-hidden glow-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3169897b5b%3A0xc39f6c1d276e7c3b!2sChicken%20Incubator%20Store!5e0!3m2!1sen!2sus!4v1644262078000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Directions Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg glow-border">
              <h2 className="text-2xl font-bold text-white mb-4">How to Find Us</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-yellow-400 mb-2">By Car</h3>
                  <p className="text-gray-300">
                    Take Highway 101 to exit 123. Turn left on Main Street, then right on Poultry Road. 
                    We're located at the end of the road.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-pink-400 mb-2">By Public Transport</h3>
                  <p className="text-gray-300">
                    Take bus #42 to Farmville Station. From there, it's a 10-minute walk east on Main Street.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-purple-400 mb-2">Parking</h3>
                  <p className="text-gray-300">
                    Free parking is available in front of our building. There's also a large parking lot behind the store.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg glow-border">
              <h2 className="text-xl font-bold text-white mb-4">Address</h2>
              <p className="text-gray-300">
                123 Poultry Street<br />
                Farmville, USA 12345<br />
                <br />
                <span className="text-yellow-400">GPS Coordinates:</span><br />
                Lat: 40.713129, Long: -74.003694
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg glow-border">
              <h2 className="text-xl font-bold text-white mb-4">Landmarks</h2>
              <ul className="space-y-2 text-gray-300">
                <li>• Next to Farmville Community Center</li>
                <li>• Across from Poultry Park</li>
                <li>• Near the Old Water Tower</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}