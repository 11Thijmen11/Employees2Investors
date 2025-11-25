import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProfileSVG from '../assets/profile.svg'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }

export default function About() {
  return (
    <div className="space-y-16 pb-8">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-primaryDark text-cream p-8 md:p-16 shadow-2xl"
      >
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">Wie ben ik?</h1>
            <p className="mt-5 text-cream/90 text-lg leading-relaxed">
              Ik zal het kort maar krachtig houden, mijn naam is Dion La Croix.
              Werknemer en investeerder met een passie voor het helpen van mensen,
              om net zoals ik van werknemer naar investeerder te groeien.
            </p>
            <p className="mt-4 text-cream/90 text-lg leading-relaxed">
              Met meerdere jaren ervaring in dit gebied wil ik nu ook jullie de mogelijkheid geven tot mijn lange termijn strategien. hierbij focus ik mij op duidelijke en eerlijke begeleiding.
            </p>
          </motion.div>

          <motion.div variants={scaleIn} className="hidden md:flex justify-center">
            <div className="card p-8 border-4 border-secondary/10 bg-gradient-to-br from-cream to-cream/80 text-center">
              <img src={ProfileSVG} alt="Profielfoto" className="w-32 h-32 rounded-full object-cover border-4 border-secondary shadow-lg mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primaryDark">Dion La Croix</h2>
              <p className="text-secondary font-semibold mt-1">Onafhankelijk Investeringsadviseur</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mobile Profile Card */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scaleIn}
        className="md:hidden container mx-auto px-4"
      >
        <div className="card p-8 border-4 border-secondary bg-gradient-to-br from-cream to-cream/80 text-center">
          <img src={ProfileSVG} alt="Profielfoto" className="w-32 h-32 rounded-full object-cover border-4 border-secondary shadow-lg mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primaryDark">Dion La Croix</h2>
          <p className="text-secondary font-semibold mt-1">Onafhankelijk Investeringsadviseur</p>
        </div>
      </motion.section>

      {/* Mission & Values */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="container mx-auto px-4"
      >
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
          Mijn waarden
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '🎯', title: 'Gericht op jou', desc: 'Elk advies is persoonlijk afgestemd op jouw situatie, doelen en risicoprofiel.' },
            { icon: '💡', title: 'Duidelijk & Eerlijk', desc: 'Geen vakjargon, geen verborgen kosten. Alles wordt transparant uitgelegd.' },
            { icon: '📈', title: 'Lange Termijn', desc: 'Ik geloof in geduldige, weloverwogen investeringsstrategieën die resultaten opleveren.' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="card p-6 md:p-8 text-center hover:shadow-xl transition-shadow border-t-4 border-secondary"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-primaryDark mb-2">{item.title}</h3>
              <p className="text-primaryDark/80 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Motivation Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="container mx-auto px-4 max-w-3xl"
      >
        <div className="card bg-gradient-to-r from-cream to-cream/90 p-8 md:p-12 rounded-3xl border-4 border-secondary">
          <motion.div variants={fadeUp}>
            <h3 className="text-3xl font-bold text-primaryDark mb-4 flex items-center gap-3">
              <span className="text-4xl">🚀</span>
              Mijn Missie
            </h3>
            <p className="text-primaryDark/90 text-lg leading-relaxed">
              Ik wil werknemers helpen om verstandige, goed onderbouwde investeringskeuzes te maken. Veel mensen voelen zich onzeker of overweldigd door investeren. Mijn doel is om die onzekerheid weg te nemen met heldere uitleg en eerlijke begeleiding.
            </p>
            <p className="text-primaryDark/90 text-lg leading-relaxed mt-4">
              Ik geloof dat iedereen kan investeren, ongeacht kennis of inkomen. Met de juiste strategie kun je jouw vermogen laten groeien en tegelijkertijd persoonlijk sterker worden.
            </p>
            <p className="text-primaryDark/90 text-lg leading-relaxed mt-4">
              Bij Employees2Investors draait het niet alleen om financiële groei, maar ook om persoonlijke ontwikkeling, discipline en rust in je geldzaken.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Credentials/Highlights */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="container mx-auto px-4"
      >
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-secondary mb-8 text-center">
          Waarom mij kiezen?
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { emoji: '✓', text: 'Onafhankelijk en transparant in alle adviezen' },
            { emoji: '✓', text: 'Luistert goed naar jouw persoonlijke situatie en doelen' },
            { emoji: '✓', text: 'Maakt complexe concepten begrijpelijk en eenvoudig' },
            { emoji: '✓', text: 'Biedt persoonlijke 1-op-1 ondersteuning en begeleiding' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="card p-6 flex items-start gap-4 hover:shadow-lg transition-shadow border-l-4 border-secondary"
            >
              <span className="text-3xl text-secondary font-bold flex-shrink-0">
                {item.emoji}
              </span>
              <p className="text-primaryDark font-medium">{item.text}</p>
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
        className="container mx-auto px-4 py-12 bg-cream rounded-3xl text-center border-4 border-secondary"
      >
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-primaryDark mb-4 ">
          Laten we kennismaken!
        </motion.h2>
        <motion.p variants={fadeUp} className="text-primaryDark/80 text-lg max-w-lg mx-auto mb-8">
          Bereid voor een kostenloos adviesgesprek van 30 minuten? Ik kijk ernaar uit om je te helpen.
        </motion.p>
        <Link to="/afspraak">
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="inline-block btn btn-secondary text-base"
          >
            → Plan een afspraak
          </motion.div>
        </Link>
      </motion.section>
    </div>
  )
}
