import React, { useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

export default function Appointment(){
  const [form, setForm] = useState({ name: '', email: '', datetime: '', message: '' })

  function handleChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e){
    e.preventDefault()
    alert(`Bedankt, ${form.name}! Je aanvraag is ontvangen.`)
    setForm({ name: '', email: '', datetime: '', message: '' })
  }

  return (
    <div className="space-y-12 pb-8">
      {/* Hero Section */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-primaryDark text-cream p-8 md:p-16 shadow-2xl text-center"
      >
        <motion.div variants={fadeUp}>
          <div className="text-5xl mb-4">📞</div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">Plan je adviesgesprek</h1>
          <p className="mt-4 text-cream/90 text-lg max-w-2xl mx-auto">
            Neem contact op voor een vrijblijvend kennismakingsgesprek van 30 minuten. 
            Leer mij kennen en ontdek hoe E2I je kan helpen bij de start van jouw investeringsreis.
          </p>
        </motion.div>
      </motion.section>

      {/* Main CTA Section - moved up before steps */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="container mx-auto px-4"
      >
        <div className="card bg-gradient-to-r from-cream to-cream/90 p-8 md:p-16 text-center rounded-3xl border-4 border-secondary">
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-primaryDark mb-4">Klaar om te beginnen?</h2>
            <p className="text-primaryDark/80 text-lg max-w-lg mx-auto mb-8">
              Klik op de knop om jouw investeerdersreis te beginnen, het duurt slecht 2 minuten!
            </p>
          </motion.div>

          <motion.a
            href="https://calendly.com/employees2investors/30min?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn5s8RaNOZTpw6FVk_KK27jJPURzvukWi5owgSXQMrKlNMuJ70KS3xJJPqpcQ_aem_rhqGIJ5_6G8c7WBIYRuUpg&month=2025-11"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, y: -4 }}
            transition={{ duration: 0.2 }}
            variants={fadeUp}
            className="inline-block btn btn-secondary text-white text-lg px-12 py-4 shadow-xl rounded-2xl font-bold"
          >
            📅 Gratis advies gesprek
          </motion.a>
        </div>
      </motion.section>

      {/* Steps Section */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="container mx-auto px-4"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { num: '1', icon: '📅', title: 'Klik op de knop', desc: 'Ga naar de Calendly-planner, kies een moment perfect, klaar ook perfect.' },
            { num: '2', icon: '📍', title: 'Kies een moment', desc: 'Selecteer een geschikte datum & tijd' },
            { num: '3', icon: '✅', title: 'Klaar!', desc: 'Ontvang een bevestiging per e-mail' }
          ].map((step, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              className="card p-6 md:p-8 text-center border-l-4 border-secondary"
            >
              <div className="text-4xl mb-3">{step.icon}</div>
              <div className="inline-block bg-secondary text-white px-3 py-1 rounded-full font-bold text-lg mb-3">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-primaryDark mb-2">{step.title}</h3>
              <p className="text-primaryDark/80 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="container mx-auto px-4 max-w-2xl"
      >
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-secondary mb-8 text-center">
          Veelgestelde vragen
        </motion.h2>

        <div className="space-y-4">
          {[
            { q: 'Ik heb nog geen ervaring met investeren. Is dit iets voor mij?', a: 'Zeker. Employees2Investors is speciaal ontwikkeld voor beginners. We leggen alles uit in duidelijke taal en begeleiden je stap voor stap.' },
            { q: 'Wat als ik geen groot bedrag kan investeren?', a: 'Je kunt ook met kleine bedragen starten. Het gaat om slim beginnen en consistent doorgroeien.' },
            { q: 'Kost dit veel tijd naast mijn baan?', a: 'Nee, het programma is juist gemaakt voor mensen met een drukke agenda. Je werkt doelgericht en efficiënt aan je financiële groei.' },
            { q: 'Wat maakt Employees2Investors anders?', a: 'Wij combineren persoonlijke begeleiding met een bewezen strategie. Geen loze beloftes, maar concrete stappen die passen bij jouw situatie.' },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              className="card p-6 border-l-4 border-secondary"
            >
              <h3 className="font-bold text-primaryDark mb-2 flex items-start gap-2">
                <span className="text-secondary">❓</span>
                {item.q}
              </h3>
              <p className="text-primaryDark/80 text-sm">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
