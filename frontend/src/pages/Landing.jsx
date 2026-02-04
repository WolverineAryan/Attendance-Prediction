import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  BarChart3, 
  Brain, 
  Cpu, 
  Database, 
  LineChart,
  Shield,
  TrendingUp,
  Upload,
  Users,
  Check,
  Sparkles,
  Target,
  Zap,
  ChevronRight,
  PieChart,
  AlertCircle,
  Download,
  Clock,
  BarChart2,
  Cloud,
  Lock,
  Smartphone,
  Monitor,
  Globe,
  Play,
  Star,
  Award,
  BarChart,
  TrendingDown,
  Users2,
  Calendar,
  FileText,
  Eye
} from "lucide-react";

export default function ModernLanding() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);
  const [animatedStats, setAnimatedStats] = useState({
    accuracy: 0,
    institutions: 0,
    predictions: 0,
    speed: 0
  });

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 2000;
          const steps = 120;
          
          const animateValue = (start, end, key, suffix = '') => {
            let current = start;
            const increment = (end - start) / steps;
            const interval = setInterval(() => {
              current += increment;
              if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(interval);
              }
              setAnimatedStats(prev => ({
                ...prev,
                [key]: key === 'speed' ? current.toFixed(1) + suffix : Math.floor(current) + suffix
              }));
            }, duration / steps);
          };

          animateValue(0, 98.7, 'accuracy', '%');
          animateValue(0, 500, 'institutions', '+');
          animateValue(0, 125000, 'predictions', '+');
          animateValue(0, 2.4, 'speed', 's');
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Predictions",
      description: "Advanced ML algorithms with 98.7% accuracy in attendance forecasting",
      color: "from-emerald-500 to-teal-400",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      points: ["Real-time predictions", "Pattern recognition", "Anomaly detection"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Intelligence",
      description: "Process CSV files with automated validation and intelligent parsing",
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      points: ["Automated validation", "Smart parsing", "Data cleaning"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "Interactive dashboards with live data visualization and insights",
      color: "from-purple-500 to-pink-400",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      points: ["Live dashboards", "Custom reports", "Export capabilities"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Risk Assessment",
      description: "Identify at-risk students early with predictive risk scoring",
      color: "from-amber-500 to-orange-400",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      points: ["Early warnings", "Risk scoring", "Intervention tracking"]
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Dean of Academic Affairs, Stanford University",
      content: "APS transformed how we track student engagement. The predictive analytics helped us improve retention by 23%.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "CTO, MIT",
      content: "The API integration was seamless. Our team now spends 80% less time on manual attendance tracking.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-emerald-50/20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-transparent via-transparent to-emerald-100/5" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isVisible ? 'bg-white/95 backdrop-blur-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate("/")}>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow duration-300">
                  <LineChart className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  APS
                </h1>
                <p className="text-xs text-gray-500 font-medium">Attendance Prediction System</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {['Features', 'Solutions', 'Pricing', 'Resources'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors duration-200 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="hidden sm:block px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors duration-200"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="group relative px-8 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-white/20 to-emerald-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200">
                <Sparkles className="w-4 h-4 text-emerald-600 mr-2" />
                <span className="text-sm font-medium text-emerald-700">
                  AI-Powered Attendance Intelligence
                </span>
                <div className="ml-3 px-2 py-1 bg-white rounded-full text-xs font-medium text-emerald-600">
                  NEW
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-gray-900">Predict Student</span>
                <span className="block bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent animate-gradient-x">
                  Success Patterns
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Advanced machine learning system that predicts attendance patterns, 
                identifies at-risk students, and provides actionable insights to 
                improve educational outcomes by up to 45%.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/signup")}
                  className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center">
                    Start Free Trial
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
                <button className="group px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 flex items-center">
                  <Play className="w-5 h-5 mr-2 text-emerald-600" />
                  Watch Demo
                  <span className="ml-2 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">(2:45)</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center pt-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-emerald-400 to-teal-300 shadow-lg shadow-emerald-500/20" />
                  ))}
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                    <span className="ml-2 text-gray-700 font-medium">4.9/5 rating</span>
                  </div>
                  <p className="text-sm text-gray-600">Trusted by 500+ leading institutions</p>
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl shadow-emerald-500/10 overflow-hidden">
                {/* Floating Elements */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-teal-400/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-400/10 rounded-full blur-3xl" />
                
                {/* Dashboard Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <div className="text-sm text-emerald-400 font-medium tracking-wider">ATTENDANCE DASHBOARD</div>
                      <div className="text-2xl font-bold text-white">Real-Time Analytics</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium">
                        LIVE
                      </div>
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <Users className="w-5 h-5 text-emerald-400" />
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-2xl font-bold text-white mt-2">2,847</div>
                      <div className="text-sm text-gray-400">Total Students</div>
                    </div>
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="text-2xl font-bold text-white mt-2">94.3%</div>
                      <div className="text-sm text-gray-400">Avg Attendance</div>
                    </div>
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 col-span-2 lg:col-span-1">
                      <div className="flex items-center justify-between">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                        <TrendingDown className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-2xl font-bold text-white mt-2">12</div>
                      <div className="text-sm text-gray-400">Risk Cases</div>
                    </div>
                  </div>

                  {/* Chart Preview */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="text-white font-medium">Department Performance</div>
                      <div className="text-sm text-gray-400">This Week</div>
                    </div>
                    
                    {[
                      { label: "Computer Science", value: 94, color: "bg-gradient-to-r from-emerald-500 to-teal-400" },
                      { label: "Engineering", value: 88, color: "bg-gradient-to-r from-blue-500 to-cyan-400" },
                      { label: "Business", value: 76, color: "bg-gradient-to-r from-purple-500 to-pink-400" },
                      { label: "Arts", value: 82, color: "bg-gradient-to-r from-amber-500 to-orange-400" }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="text-gray-300">{item.label}</div>
                          <div className="text-white font-medium">{item.value}%</div>
                        </div>
                        <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: animatedStats.accuracy, label: "Prediction Accuracy", icon: <Award /> },
              { value: animatedStats.institutions, label: "Institutions", icon: <Building /> },
              { value: animatedStats.predictions, label: "Predictions Made", icon: <BarChart /> },
              { value: animatedStats.speed, label: "Processing Speed", icon: <Zap /> }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl bg-white border border-gray-200 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 mb-4">
                  <div className="text-emerald-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 mb-4">
              <Sparkles className="w-4 h-4 text-emerald-600 mr-2" />
              <span className="text-sm font-medium text-emerald-700">Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed for modern educational institutions
            </p>
          </div>

          {/* Features Grid with Interactive Preview */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Feature Selector */}
            <div className="lg:col-span-5 space-y-4">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${activeFeature === index ? 
                    `${feature.bgColor} border border-emerald-200 shadow-lg` : 
                    'bg-white border border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 mb-3">{feature.description}</p>
                      <ul className="space-y-1">
                        {feature.points.map((point, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <Check className="w-4 h-4 text-emerald-500 mr-2" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Feature Preview */}
            <div className="lg:col-span-7">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
                  <div className="relative">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-teal-400/10 rounded-full blur-3xl" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <div className="text-sm text-emerald-400 font-medium">FEATURE PREVIEW</div>
                          <div className="text-2xl font-bold text-white">{features[activeFeature].title}</div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-medium">
                          Interactive
                        </div>
                      </div>

                      {/* Feature-specific Preview */}
                      <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-gray-800/60 rounded-xl p-4">
                            <div className="text-sm text-gray-400">Accuracy</div>
                            <div className="text-2xl font-bold text-white">98.7%</div>
                          </div>
                          <div className="bg-gray-800/60 rounded-xl p-4">
                            <div className="text-sm text-gray-400">Speed</div>
                            <div className="text-2xl font-bold text-white">2.4s</div>
                          </div>
                          <div className="bg-gray-800/60 rounded-xl p-4">
                            <div className="text-sm text-gray-400">Coverage</div>
                            <div className="text-2xl font-bold text-white">100%</div>
                          </div>
                        </div>

                        <div className="h-48 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center">
                          <div className="text-center">
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${features[activeFeature].color} flex items-center justify-center mx-auto mb-4`}>
                              {features[activeFeature].icon}
                            </div>
                            <div className="text-white font-medium">Live Preview</div>
                            <div className="text-sm text-gray-400">Real-time visualization</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 mb-4">
              <Zap className="w-4 h-4 text-emerald-600 mr-2" />
              <span className="text-sm font-medium text-emerald-700">Workflow</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple Yet Powerful Workflow
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform raw data into actionable insights in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-1 bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200" />
            
            {[
              { 
                icon: <Upload className="w-6 h-6" />, 
                title: "Upload Data", 
                desc: "Import CSV files or connect APIs",
                color: "from-emerald-500 to-teal-400"
              },
              { 
                icon: <Cpu className="w-6 h-6" />, 
                title: "AI Processing", 
                desc: "ML algorithms analyze patterns",
                color: "from-blue-500 to-cyan-400"
              },
              { 
                icon: <LineChart className="w-6 h-6" />, 
                title: "Generate Insights", 
                desc: "Visualize predictions and risks",
                color: "from-purple-500 to-pink-400"
              },
              { 
                icon: <AlertCircle className="w-6 h-6" />, 
                title: "Take Action", 
                desc: "Receive alerts and recommendations",
                color: "from-amber-500 to-orange-400"
              }
            ].map((step, index) => (
              <div key={index} className="relative text-center group">
                <div className="relative mx-auto mb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-${step.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-white text-emerald-600 font-bold flex items-center justify-center shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 mb-4">
              <Users2 className="w-4 h-4 text-emerald-600 mr-2" />
              <span className="text-sm font-medium text-emerald-700">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Leading Institutions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-300 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              {/* Content */}
              <div className="relative z-10 p-12 md:p-16 text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                  <Target className="w-4 h-4 text-white mr-2" />
                  <span className="text-sm font-medium text-white">Limited Time Offer</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Transform Your Institution?
                </h2>

                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Join 500+ educational institutions using APS to improve student engagement and success rates.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate("/signup")}
                    className="group px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center hover:shadow-2xl"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button className="px-8 py-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300">
                    Schedule a Demo
                  </button>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">14-day</div>
                    <div className="text-white/70 text-sm">Free trial</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">No credit card</div>
                    <div className="text-white/70 text-sm">Required</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">Full access</div>
                    <div className="text-white/70 text-sm">All features</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
                  <LineChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">APS</h3>
                  <p className="text-sm text-gray-400">Attendance Prediction System</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md">
                AI-powered analytics platform helping educational institutions predict student success through advanced machine learning.
              </p>
            </div>

            {['Product', 'Resources', 'Company', 'Legal'].map((category) => (
              <div key={category}>
                <h3 className="font-semibold text-white mb-4">{category}</h3>
                <ul className="space-y-3">
                  {['Features', 'Pricing', 'API', 'Documentation', 'Contact'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 APS Attendance Prediction System. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper component for building icon
function Building(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}