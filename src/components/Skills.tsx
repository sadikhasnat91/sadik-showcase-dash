import { motion } from "framer-motion";
import { 
  Smartphone, 
  Code2, 
  Database, 
  GitBranch, 
  Palette, 
  Cloud,
  Layers,
  Zap
} from "lucide-react";

const skills = [
  { name: "Android Development", level: 95, icon: Smartphone, color: "from-green-500 to-emerald-600" },
  { name: "Flutter", level: 88, icon: Layers, color: "from-blue-400 to-cyan-500" },
  { name: "Dart", level: 85, icon: Zap, color: "from-cyan-400 to-blue-500" },
  { name: "Java / Kotlin", level: 90, icon: Code2, color: "from-orange-500 to-red-500" },
  { name: "Firebase", level: 85, icon: Database, color: "from-amber-500 to-orange-500" },
  { name: "REST API Integration", level: 88, icon: Cloud, color: "from-violet-500 to-purple-600" },
  { name: "UI/UX Design", level: 80, icon: Palette, color: "from-pink-500 to-rose-500" },
  { name: "Git & GitHub", level: 85, icon: GitBranch, color: "from-gray-600 to-gray-800" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 lg:py-32 bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <skill.icon className="w-7 h-7 text-white" />
              </div>

              {/* Skill Name */}
              <h3 className="font-semibold text-lg mb-3">{skill.name}</h3>

              {/* Progress Bar */}
              <div className="relative">
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
                <span className="absolute -top-6 right-0 text-sm font-medium text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
