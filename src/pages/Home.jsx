import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Chart from '../components/Chart'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }

export default function Home(){
  return (
    <div className="space-y-16 pb-8">
      {/* Hero Section */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-50px" }} 
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary to-primaryDark text-cream p-8 md:p-20 shadow-2xl"
      >
        <div className="container mx-auto">
          {/* Hero Content */}
          <motion.div variants={fadeUp} className="mb-12">
            <div className="mb-2 inline-block bg-secondary/20 px-4 py-1 rounded-full text-secondary text-sm font-semibold">
              💼 Investeringsadvies voor werknemers
            </div>
            <h1 className="text-2xl md:text-5xl font-black leading-tight mt-4">Employees2Investors</h1>
            <p className="mt-5 text-cream/90 text-lg max-w-lg leading-relaxed">Wij helpen werknemers strategisch hun investeringskeuzes te maken met persoonlijke begeleiding en lange termijn strategiën, zodat geld echt voor jou kan werken.</p>

            <div className="mt-10 flex flex-wrap gap-4">
              <motion.a 
                href="https://preview.mailerlite.io/forms/1879033/169236138024765227/share" 
                target="_blank" 
                rel="noreferrer" 
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
                className="btn btn-secondary text-base"
              >
                📥 Download gratis gids
              </motion.a>
              <Link to="/afspraak">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="btn btn-primary text-base"
                >
                  ✓ Maak een afspraak
                </motion.div>
              </Link>
              <Link to="/over">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="btn btn-primary text-base"
                >
                  🙋‍♂️ Over mij
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Markttrends Card - Below the content */}
          <motion.div variants={scaleIn}>
            <div className="card p-6 md:p-8 border-4 border-primary bg-white">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-black">Markttrends</h2>
                <p className="text-primaryDark mt-1 text-sm">Volg actuele beurskoersen en markt inzichten</p>
              </div>
              <Chart />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="container mx-auto px-4"
      >
        <div className="mb-12 text-center">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-black">Hoe het werkt</motion.h2>
          <motion.div variants={fadeUp} className="mt-2 h-1 bg-gradient-to-r from-secondary via-secondary to-transparent w-32 mx-auto"></motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '📞', title: 'Kennismaken', desc: 'We starten met een vrijblijvend gesprek om jouw doelen te begrijpen.' },
            { icon: '📊', title: 'Analyseren', desc: 'Je krijgt inzicht in je financiële positie en de kansen die daarbij horen.' },
            { icon: '🚀', title: 'Actie nemen', desc: 'Met het Interest(ing) System helpen we je om stap voor stap te investeren op een manier die bij jou past.' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              className="card hover:shadow-xl transition-shadow p-6 md:p-8 text-center group"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-primaryDark mb-2">{item.title}</h3>
              <p className="text-primaryDark/80 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="container mx-auto px-4 py-12 bg-white rounded-3xl border-4 border-primary"
      >
        <div className="text-center">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-primaryDark">Klaar om te starten?</motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-primaryDark/80 max-w-lg mx-auto text-lg">
            Plan nu je gratis adviesgesprek van 30 minuten en ontdek hoe Employees2Investors jou kan helpen om geld voor je te laten werken.
            
            <motion.p variants={fadeUp} className="mt-3 text-primaryDark/80 max-w-lg mx-auto text-lg"></motion.p>
            Er zijn op dit moment 8 van de 12 plekken beschikbaar voor deze maand.
            Elke maand openen we opnieuw de inschrijvingen, dus wees er op tijd bij.
          </motion.p>
          <Link to="/afspraak">
            <motion.div
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="inline-block mt-6 btn btn-secondary text-base"
            >
              → Plan een afspraak
            </motion.div>
          </Link>
        </div>
      </motion.section>

      {/* Trustpilot Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="container mx-auto px-4"
      >
        <div className="trustpilot-widget" data-locale="nl-NL" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="69359b5fffffdcbe6fca6caa" data-style-height="52px" data-style-width="100%" data-token="fcf807d8-4cb6-4dd4-b702-6a13675d5d3d">
          <a href="https://nl.trustpilot.com/review/employees2investors.nl" target="_blank" rel="noopener">Trustpilot</a>
        </div>
      </motion.section>
    </div>
  )
}
