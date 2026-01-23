import { motion } from "framer-motion";
import { MapPin, Building2, GraduationCap } from "lucide-react";

const education = [
  {
    degree: "BSc in CSE",
    institution: "Northern University Business and Technology, Khulna",
    year: "2026",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop&crop=center",
  },
  {
    degree: "HSC",
    institution: "Bongobandhu Govt College",
    year: "2021",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=200&fit=crop&crop=center",
  },
  {
    degree: "SSC",
    institution: "Khulna Zilla School",
    year: "2019",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&h=200&fit=crop&crop=center",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know my background, experience, and educational journey
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* About Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="glass-card p-8 border border-border/50 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm a passionate Android Developer with a keen eye for creating elegant, 
                user-friendly mobile applications. Currently pursuing my BSc in Computer 
                Science & Engineering while working professionally at INTELLEEO.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Currently Working At</p>
                    <p className="text-muted-foreground text-sm">INTELLEEO</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Office Address</p>
                    <p className="text-muted-foreground text-sm">11 Kobor Khana Road, Khulna</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">Education</h3>
            </motion.div>

            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group flex items-center gap-6 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative flex-shrink-0">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors"
                  >
                    <img
                      src={edu.image}
                      alt={edu.institution}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  {index < education.length - 1 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-6 bg-border" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                    {edu.degree}
                  </h4>
                  <p className="text-muted-foreground text-sm">{edu.institution}</p>
                  <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    Passing Year: {edu.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
