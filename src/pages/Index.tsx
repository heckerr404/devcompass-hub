import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Zap, Code, GitBranch, Terminal } from "lucide-react";
import AIBrainBackground from "@/components/ui/AIBrainBackground";
import GlowingButton from "@/components/ui/GlowingButton";
import DevOpsMetricsChart from "@/components/DevOpsMetricsChart";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-cyan-400" />,
      title: "Self-Healing Pipelines",
      description: "AI autonomously detects and fixes build failures in real-time.",
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      title: "Instant Deployments",
      description: "Optimized workflows reduce deployment time by up to 90%.",
    },
    {
      icon: <Code className="w-8 h-8 text-pink-400" />,
      title: "Smart Code Analysis",
      description: "Deep learning models predict bugs before they reach production.",
    },
    {
      icon: <GitBranch className="w-8 h-8 text-green-400" />,
      title: "Automated Branching",
      description: "Context-aware branch management for seamless collaboration.",
    },
  ];

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <AIBrainBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-xl tracking-tight">DevCompass<span className="text-cyan-400">.AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium hover:text-cyan-400 transition-colors">Features</a>
            <a href="#" className="text-sm font-medium hover:text-cyan-400 transition-colors">Documentation</a>
            <a href="#" className="text-sm font-medium hover:text-cyan-400 transition-colors">Pricing</a>
            <GlowingButton className="h-9 px-4 text-xs uppercase tracking-wider">Get Started</GlowingButton>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-6 border-cyan-500/50 text-cyan-400 px-4 py-1.5 text-sm uppercase tracking-widest">
              Next Gen DevOps
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-purple-200"
          >
            Autonomous Healing for <br />
            <span className="text-cyan-400 relative inline-block">
              Broken Pipelines
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-cyan-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Stop debugging CI/CD failures manually. Our AI agent actively monitors, diagnoses, and patches your pipelines in real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GlowingButton className="h-14 px-8 text-lg w-full sm:w-auto">
              <Rocket className="mr-2 w-5 h-5" />
              Deploy AI Agent
            </GlowingButton>
            <GlowingButton glowColor="rgba(168, 85, 247, 0.6)" className="h-14 px-8 text-lg w-full sm:w-auto bg-transparent border-slate-700 hover:bg-slate-800">
              View Live Demo
            </GlowingButton>
          </motion.div>
        </div>

        {/* Stats & Chart Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <Card className="bg-black/40 border-slate-800 backdrop-blur-sm p-6 text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">99.9%</div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">Uptime Guaranteed</div>
            </Card>
            <Card className="bg-black/40 border-slate-800 backdrop-blur-sm p-6 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">50x</div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">Faster Fixes</div>
            </Card>
            <Card className="bg-black/40 border-slate-800 backdrop-blur-sm p-6 text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">0</div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">Human Intervention</div>
            </Card>
          </div>

          <DevOpsMetricsChart />
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 group">
                <div className="p-6">
                  <div className="mb-4 p-3 bg-slate-950 rounded-lg inline-block group-hover:scale-110 transition-transform duration-300 border border-slate-800 group-hover:border-cyan-500/30">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/80 py-12 text-center text-slate-500 text-sm">
        <p>© 2026 DevCompass AI. Built for RIFT Hackathon.</p>
      </footer>
    </div>
  );
};

export default Index;
