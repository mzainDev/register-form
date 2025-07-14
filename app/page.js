import React from 'react'

const page = () => {
  return (
    <>
      {/* Modern Header */}
      <header className="bg-gradient-to-r from-blue-50 to-blue-100 py-20 px-6 text-center shadow-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Registeration Form
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Set up your center quickly and efficiently — all in one seamless form.
        </p>
      </header>

      {/* Form Section */}
      <section className="py-16 px-6 bg-zinc-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <form className="bg-white rounded-2xl shadow-xl p-10 grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div>
                <label htmlFor="Name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  id="Name"
                  type="text"
                  placeholder="e.g. Little Stars Academy"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="e.g. admin@center.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="e.g. 0301-1234567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white text-lg py-3 rounded-xl hover:bg-blue-700 transition duration-300"
            >
              Submit for Activation
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
 
export default page