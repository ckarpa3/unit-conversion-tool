import React, { useState, useEffect } from 'react';
import { Activity, Thermometer, Ruler, Scale, Clock, Zap, Gauge, Square, Wind, Move, Battery, Droplets } from 'lucide-react';

const UnitConverter = () => {
  const [activeCategory, setActiveCategory] = useState('length');
  const [fromValue, setFromValue] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState('');

  const categories = {
    length: {
      name: 'Length',
      icon: Ruler,
      color: 'bg-blue-500',
      units: {
        mm: { name: 'Millimeters', factor: 0.001 },
        cm: { name: 'Centimeters', factor: 0.01 },
        m: { name: 'Meters', factor: 1 },
        km: { name: 'Kilometers', factor: 1000 },
        in: { name: 'Inches (Decimal)', factor: 0.0254 },
        frac_in: { name: 'Inches (Fractional)', factor: 0.0254, fractional: true },
        ft: { name: 'Feet', factor: 0.3048 },
        yd: { name: 'Yards', factor: 0.9144 },
        mi: { name: 'Miles', factor: 1609.344 }
      }
    },
    weight: {
      name: 'Weight',
      icon: Scale,
      color: 'bg-teal-500',
      units: {
        mg: { name: 'Milligrams', factor: 0.001 },
        g: { name: 'Grams', factor: 1 },
        kg: { name: 'Kilograms', factor: 1000 },
        oz: { name: 'Ounces', factor: 28.3495 },
        lb: { name: 'Pounds', factor: 453.592 },
        ton: { name: 'Tons', factor: 1000000 }
      }
    },
    temperature: {
      name: 'Temperature',
      icon: Thermometer,
      color: 'bg-cyan-500',
      units: {
        c: { name: 'Celsius' },
        f: { name: 'Fahrenheit' },
        k: { name: 'Kelvin' }
      }
    },
    time: {
      name: 'Time',
      icon: Clock,
      color: 'bg-sky-500',
      units: {
        ms: { name: 'Milliseconds', factor: 0.001 },
        s: { name: 'Seconds', factor: 1 },
        min: { name: 'Minutes', factor: 60 },
        hr: { name: 'Hours', factor: 3600 },
        day: { name: 'Days', factor: 86400 },
        week: { name: 'Weeks', factor: 604800 },
        month: { name: 'Months', factor: 2629746 },
        year: { name: 'Years', factor: 31556952 }
      }
    },
    energy: {
      name: 'Energy',
      icon: Zap,
      color: 'bg-indigo-500',
      units: {
        j: { name: 'Joules', factor: 1 },
        kj: { name: 'Kilojoules', factor: 1000 },
        cal: { name: 'Calories', factor: 4.184 },
        kcal: { name: 'Kilocalories', factor: 4184 },
        wh: { name: 'Watt Hours', factor: 3600 },
        kwh: { name: 'Kilowatt Hours', factor: 3600000 },
        btu: { name: 'BTU', factor: 1055.06 }
      }
    },
    pressure: {
      name: 'Pressure',
      icon: Gauge,
      color: 'bg-slate-500',
      units: {
        pa: { name: 'Pascals', factor: 1 },
        kpa: { name: 'Kilopascals', factor: 1000 },
        mpa: { name: 'Megapascals', factor: 1000000 },
        bar: { name: 'Bar', factor: 100000 },
        mbar: { name: 'Millibar', factor: 100 },
        atm: { name: 'Atmosphere', factor: 101325 },
        psi: { name: 'PSI', factor: 6894.76 },
        torr: { name: 'Torr', factor: 133.322 },
        mmhg: { name: 'mmHg', factor: 133.322 },
        inhg: { name: 'inHg', factor: 3386.39 }
      }
    },
    area: {
      name: 'Area',
      icon: Square,
      color: 'bg-emerald-500',
      units: {
        mm2: { name: 'Square Millimeters', factor: 0.000001 },
        cm2: { name: 'Square Centimeters', factor: 0.0001 },
        m2: { name: 'Square Meters', factor: 1 },
        km2: { name: 'Square Kilometers', factor: 1000000 },
        in2: { name: 'Square Inches', factor: 0.00064516 },
        ft2: { name: 'Square Feet', factor: 0.092903 },
        yd2: { name: 'Square Yards', factor: 0.836127 },
        acre: { name: 'Acres', factor: 4046.86 },
        hectare: { name: 'Hectares', factor: 10000 },
        mi2: { name: 'Square Miles', factor: 2589988 },
        chain2: { name: 'Square Chains', factor: 404.686 }
      }
    },
    speed: {
      name: 'Speed',
      icon: Wind,
      color: 'bg-violet-500',
      units: {
        mps: { name: 'Meters/Second', factor: 1 },
        kph: { name: 'Kilometers/Hour', factor: 0.277778 },
        mph: { name: 'Miles/Hour', factor: 0.44704 },
        fps: { name: 'Feet/Second', factor: 0.3048 },
        knot: { name: 'Knots', factor: 0.514444 },
        mach: { name: 'Mach (Sea Level)', factor: 343 }
      }
    },
    force: {
      name: 'Force',
      icon: Move,
      color: 'bg-rose-500',
      units: {
        n: { name: 'Newtons', factor: 1 },
        kn: { name: 'Kilonewtons', factor: 1000 },
        dyne: { name: 'Dynes', factor: 0.00001 },
        lbf: { name: 'Pounds-Force', factor: 4.44822 },
        kgf: { name: 'Kilograms-Force', factor: 9.80665 },
        pdl: { name: 'Poundals', factor: 0.138255 },
        ftlb: { name: 'Foot-Pounds', factor: 1.35582 },
        inlb: { name: 'Inch-Pounds', factor: 0.112985 }
      }
    },
    power: {
      name: 'Power',
      icon: Battery,
      color: 'bg-amber-500',
      units: {
        w: { name: 'Watts', factor: 1 },
        kw: { name: 'Kilowatts', factor: 1000 },
        mw: { name: 'Megawatts', factor: 1000000 },
        hp: { name: 'Horsepower (Mechanical)', factor: 745.7 },
        hp_metric: { name: 'Horsepower (Metric)', factor: 735.499 },
        btuh: { name: 'BTU/Hour', factor: 0.293071 },
        ftlbs: { name: 'Foot-Pounds/Second', factor: 1.35582 }
      }
    },
    volume: {
      name: 'Volume',
      icon: Droplets,
      color: 'bg-blue-400',
      units: {
        ml: { name: 'Milliliters', factor: 0.001 },
        l: { name: 'Liters', factor: 1 },
        m3: { name: 'Cubic Meters', factor: 1000 },
        cm3: { name: 'Cubic Centimeters', factor: 0.001 },
        in3: { name: 'Cubic Inches', factor: 0.0163871 },
        ft3: { name: 'Cubic Feet', factor: 28.3168 },
        yd3: { name: 'Cubic Yards', factor: 764.555 },
        gal_us: { name: 'Gallons (US)', factor: 3.78541 },
        gal_uk: { name: 'Gallons (UK)', factor: 4.54609 },
        qt_us: { name: 'Quarts (US)', factor: 0.946353 },
        pt_us: { name: 'Pints (US)', factor: 0.473176 },
        floz_us: { name: 'Fluid Ounces (US)', factor: 0.0295735 },
        cup_us: { name: 'Cups (US)', factor: 0.236588 },
        tbsp: { name: 'Tablespoons', factor: 0.0147868 },
        tsp: { name: 'Teaspoons', factor: 0.00492892 },
        barrel: { name: 'Barrels (Oil)', factor: 158.987 },
        gondola: { name: 'Gondola Car (ft³)', factor: 99106 },
        water_kg: { name: 'Water (kg)', factor: 1, density: 1000 },
        concrete_kg: { name: 'Concrete (kg)', factor: 1, density: 2400 },
        steel_kg: { name: 'Steel (kg)', factor: 1, density: 7850 },
        aluminum_kg: { name: 'Aluminum (kg)', factor: 1, density: 2700 },
        wood_pine_kg: { name: 'Pine Wood (kg)', factor: 1, density: 500 },
        sand_kg: { name: 'Sand (kg)', factor: 1, density: 1600 },
        gravel_kg: { name: 'Gravel (kg)', factor: 1, density: 1800 },
        coal_kg: { name: 'Coal (kg)', factor: 1, density: 1350 },
        water_lb: { name: 'Water (lbs)', factor: 1, density: 2204.62, imperial: true },
        concrete_lb: { name: 'Concrete (lbs)', factor: 1, density: 5291.09, imperial: true },
        steel_lb: { name: 'Steel (lbs)', factor: 1, density: 17306.27, imperial: true },
        aluminum_lb: { name: 'Aluminum (lbs)', factor: 1, density: 5952.48, imperial: true },
        wood_pine_lb: { name: 'Pine Wood (lbs)', factor: 1, density: 1102.31, imperial: true },
        sand_lb: { name: 'Sand (lbs)', factor: 1, density: 3527.39, imperial: true },
        gravel_lb: { name: 'Gravel (lbs)', factor: 1, density: 3968.32, imperial: true },
        coal_lb: { name: 'Coal (lbs/ft³)', factor: 1, density: 84.3, imperial: true }
      }
    }
  };

  const convertTemperature = (value, from, to) => {
    let celsius;
    
    // Convert to Celsius first
    switch (from) {
      case 'c':
        celsius = value;
        break;
      case 'f':
        celsius = (value - 32) * 5/9;
        break;
      case 'k':
        celsius = value - 273.15;
        break;
      default:
        return 0;
    }
    
    // Convert from Celsius to target
    switch (to) {
      case 'c':
        return celsius;
      case 'f':
        return celsius * 9/5 + 32;
      case 'k':
        return celsius + 273.15;
      default:
        return 0;
    }
  };

  const convertUnits = (value, from, to, category) => {
    if (!value || !from || !to) return '';
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';
    
    if (category === 'temperature') {
      return convertTemperature(numValue, from, to).toFixed(6);
    }
    
    const units = categories[category].units;
    const fromUnit = units[from];
    const toUnit = units[to];
    
    // Handle material weight conversions (volume to weight)
    if (fromUnit?.density && toUnit?.density) {
      // Converting between materials - need to go through volume
      if (fromUnit.imperial && toUnit.imperial) {
        // Both imperial - convert through cubic feet
        const volumeInCubicFeet = numValue / fromUnit.density; // lbs to cubic feet
        const weightInLbs = volumeInCubicFeet * toUnit.density; // cubic feet to lbs
        return weightInLbs.toFixed(6);
      } else if (fromUnit.imperial && !toUnit.imperial) {
        // Imperial to metric
        const volumeInCubicFeet = numValue / fromUnit.density; // lbs to cubic feet
        const volumeInLiters = volumeInCubicFeet * 28.3168; // cubic feet to liters
        const weightInKg = volumeInLiters * toUnit.density / 1000; // liters to kg
        return weightInKg.toFixed(6);
      } else if (!fromUnit.imperial && toUnit.imperial) {
        // Metric to imperial
        const volumeInLiters = numValue / fromUnit.density * 1000; // kg to liters
        const volumeInCubicFeet = volumeInLiters / 28.3168; // liters to cubic feet
        const weightInLbs = volumeInCubicFeet * toUnit.density; // cubic feet to lbs
        return weightInLbs.toFixed(6);
      } else {
        // Both metric
        const volumeInLiters = numValue / fromUnit.density * 1000; // kg to liters
        const weightInKg = volumeInLiters * toUnit.density / 1000; // liters to kg
        return weightInKg.toFixed(6);
      }
    } else if (fromUnit?.density && !toUnit?.density) {
      // Converting from material weight to volume
      if (fromUnit.imperial) {
        const volumeInCubicFeet = numValue / fromUnit.density; // lbs to cubic feet
        const volumeInLiters = volumeInCubicFeet * 28.3168; // cubic feet to liters
        const result = volumeInLiters / (toUnit?.factor || 1);
        return result.toFixed(6);
      } else {
        const volumeInLiters = numValue / fromUnit.density * 1000; // kg to liters
        const result = volumeInLiters / (toUnit?.factor || 1);
        return result.toFixed(6);
      }
    } else if (!fromUnit?.density && toUnit?.density) {
      // Converting from volume to material weight
      if (toUnit.imperial) {
        const volumeInLiters = numValue * (fromUnit?.factor || 1);
        const volumeInCubicFeet = volumeInLiters / 28.3168; // liters to cubic feet
        const weightInLbs = volumeInCubicFeet * toUnit.density; // cubic feet to lbs
        return weightInLbs.toFixed(6);
      } else {
        const volumeInLiters = numValue * (fromUnit?.factor || 1);
        const weightInKg = volumeInLiters * toUnit.density / 1000;
        return weightInKg.toFixed(6);
      }
    } else {
      // Regular volume conversion
      const fromFactor = fromUnit?.factor || 1;
      const toFactor = toUnit?.factor || 1;
      const result = (numValue * fromFactor) / toFactor;
      
      // Handle fractional inches output
      if (to === 'frac_in') {
        return decimalToFraction(result);
      }
      
      return result.toFixed(6);
    }
  };

  const decimalToFraction = (decimal) => {
    const wholeNumber = Math.floor(decimal);
    const fractionalPart = decimal - wholeNumber;
    
    // Common denominators used in construction/woodworking (up to 1/16)
    const denominators = [2, 4, 8, 16];
    
    if (fractionalPart === 0) {
      return wholeNumber.toString() + '"';
    }
    
    // Find the best fraction representation within 1/16 precision
    let bestNumerator = 0;
    let bestDenominator = 16;
    let smallestError = Math.abs(fractionalPart);
    
    for (const denom of denominators) {
      const numerator = Math.round(fractionalPart * denom);
      const fractionValue = numerator / denom;
      const error = Math.abs(fractionalPart - fractionValue);
      
      if (error < smallestError && numerator > 0 && numerator < denom) {
        bestNumerator = numerator;
        bestDenominator = denom;
        smallestError = error;
      }
    }
    
    // Reduce the fraction to lowest terms
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = gcd(bestNumerator, bestDenominator);
    const reducedNumerator = bestNumerator / commonDivisor;
    const reducedDenominator = bestDenominator / commonDivisor;
    
    if (reducedNumerator === 0) {
      return wholeNumber.toString() + '"';
    } else if (wholeNumber === 0) {
      return `${reducedNumerator}/${reducedDenominator}"`;
    } else {
      return `${wholeNumber} ${reducedNumerator}/${reducedDenominator}"`;
    }
  };

  const parseFractionalInches = (input) => {
    // Handle fractional input like "1 1/2", "3/4", "2.5", "12", etc.
    const str = input.toString().trim().replace(/"/g, ''); // Remove inch marks if present
    
    if (!str) return 0;
    
    // Check for pure decimal numbers
    if (!isNaN(parseFloat(str)) && !str.includes('/') && !str.includes(' ')) {
      return parseFloat(str);
    }
    
    // Parse mixed fraction format: "1 1/2" 
    const spaceIndex = str.indexOf(' ');
    if (spaceIndex > 0) {
      const wholePart = str.substring(0, spaceIndex);
      const fractionPart = str.substring(spaceIndex + 1);
      
      const wholeNumber = parseInt(wholePart) || 0;
      
      if (fractionPart.includes('/')) {
        const [numerator, denominator] = fractionPart.split('/');
        const fractionValue = (parseInt(numerator) || 0) / (parseInt(denominator) || 1);
        return wholeNumber + fractionValue;
      }
      
      return wholeNumber;
    }
    
    // Parse simple fraction: "3/4"
    if (str.includes('/')) {
      const [numerator, denominator] = str.split('/');
      return (parseInt(numerator) || 0) / (parseInt(denominator) || 1);
    }
    
    // Parse whole number
    return parseInt(str) || 0;
  };

  useEffect(() => {
    const categoryUnits = Object.keys(categories[activeCategory].units);
    if (!fromUnit || !categoryUnits.includes(fromUnit)) {
      setFromUnit(categoryUnits[0] || '');
    }
    if (!toUnit || !categoryUnits.includes(toUnit)) {
      setToUnit(categoryUnits[1] || categoryUnits[0] || '');
    }
  }, [activeCategory]);

  useEffect(() => {
    let converted = '';
    
    if (fromValue) {
      if (fromUnit === 'frac_in') {
        // Parse fractional inches input
        const parsedValue = parseFractionalInches(fromValue);
        if (!isNaN(parsedValue)) {
          converted = convertUnits(parsedValue, fromUnit, toUnit, activeCategory);
        }
      } else {
        // Regular numeric conversion
        const numValue = parseFloat(fromValue);
        if (!isNaN(numValue)) {
          converted = convertUnits(numValue, fromUnit, toUnit, activeCategory);
        }
      }
    }
    
    setResult(converted);
  }, [fromValue, fromUnit, toUnit, activeCategory]);

  const formatResult = (value) => {
    if (!value) return '';
    const num = parseFloat(value);
    if (num === 0) return '0';
    if (Math.abs(num) >= 1000000 || Math.abs(num) <= 0.0001) {
      return num.toExponential(4);
    }
    return parseFloat(num.toPrecision(8)).toString();
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setFromValue(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-900 p-4 relative overflow-hidden font-mono">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes colorCycle {
            0% { color: #67e8f9; }
            20% { color: #34d399; }
            40% { color: #60a5fa; }
            60% { color: #a78bfa; }
            80% { color: #f472b6; }
            100% { color: #67e8f9; }
          }
          @keyframes atomSpin {
            0% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(90deg) scale(1.1); }
            50% { transform: rotate(180deg) scale(1); }
            75% { transform: rotate(270deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
          }
          .animated-atom {
            animation: atomSpin 3s ease-in-out infinite, colorCycle 4s linear infinite;
          }
        `
      }} />
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Enhanced Ocean Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating particles/plankton */}
          <div className="absolute top-10 left-1/4 w-1 h-1 bg-cyan-200/40 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-200/30 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-teal-200/35 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-cyan-300/40 rounded-full animate-ping" style={{animationDelay: '6s'}}></div>
          <div className="absolute bottom-1/4 left-2/3 w-1 h-1 bg-blue-300/30 rounded-full animate-ping" style={{animationDelay: '8s'}}></div>
          
          {/* Gentle light rays */}
          <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-cyan-300/20 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-0 right-1/3 w-px h-48 bg-gradient-to-b from-blue-300/15 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-0 left-2/3 w-px h-24 bg-gradient-to-b from-teal-300/25 to-transparent animate-pulse" style={{animationDelay: '5s'}}></div>
          
          {/* Large Bubbles */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/15 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-300/20 rounded-full animate-bounce shadow-md"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-teal-400/15 rounded-full animate-pulse shadow-xl"></div>
          <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-sky-300/25 rounded-full animate-bounce shadow-lg"></div>
          
          {/* Medium Bubbles */}
          <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-cyan-400/20 rounded-full animate-pulse shadow-md"></div>
          <div className="absolute top-2/3 right-1/4 w-12 h-12 bg-blue-300/25 rounded-full animate-bounce shadow-sm"></div>
          <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-teal-300/15 rounded-full animate-pulse shadow-lg"></div>
          
          {/* Small Floating Bubbles */}
          <div className="absolute top-1/4 right-1/2 w-8 h-8 bg-cyan-200/30 rounded-full animate-bounce shadow-sm"></div>
          <div className="absolute top-3/4 left-2/3 w-6 h-6 bg-blue-200/35 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-2/3 w-10 h-10 bg-teal-200/25 rounded-full animate-bounce shadow-sm"></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `linear-gradient(rgba(103, 232, 249, 0.1) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(103, 232, 249, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
          
          {/* Seaweed-like vertical elements */}
          <div className="absolute bottom-0 left-1/4 w-2 h-48 bg-gradient-to-t from-teal-600/40 to-transparent rounded-t-full animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-3 h-36 bg-gradient-to-t from-blue-600/35 to-transparent rounded-t-full animate-pulse"></div>
          <div className="absolute bottom-0 left-3/4 w-2 h-56 bg-gradient-to-t from-cyan-600/30 to-transparent rounded-t-full animate-pulse"></div>
        </div>

        <div className="text-center mb-6 relative z-10">
          <h1 className="text-2xl font-semibold text-white mb-1 flex items-center justify-center gap-2 tracking-wide">
            <Activity className="w-6 h-6 animated-atom drop-shadow-lg" />
            Unit Conversion System
          </h1>
          <p className="text-cyan-100 text-lg drop-shadow tracking-wide">SCIENTIFIC MEASUREMENT CONVERSION</p>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8 relative z-10">
          {Object.entries(categories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`p-3 rounded-sm transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === key
                    ? `${category.color} text-white shadow-lg shadow-${category.color}/30`
                    : 'bg-white/15 text-cyan-100 hover:bg-white/25 hover:text-white'
                } backdrop-blur-md border border-white/20 shadow-lg`}
              >
                <IconComponent className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-medium tracking-wider uppercase">{category.name}</div>
              </button>
            );
          })}
        </div>

        {/* Conversion Interface */}
        <div className="bg-white/15 backdrop-blur-xl rounded-sm p-8 border border-white/25 shadow-2xl shadow-blue-900/20 relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* From Section */}
            <div className="space-y-4">
              <label className="block text-white text-sm font-medium drop-shadow tracking-wider uppercase">From:</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-3 rounded-sm bg-white/20 border border-cyan-300/30 text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 backdrop-blur-md shadow-inner"
              >
                {Object.entries(categories[activeCategory].units).map(([key, unit]) => (
                  <option key={key} value={key} className="bg-slate-800 text-white">
                    {unit.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder={fromUnit === 'frac_in' ? 'e.g. 12, 1 1/2, 3/4, 5/16' : 'Enter value'}
                className="w-full p-4 rounded-sm bg-white/20 border border-cyan-300/30 text-white text-lg placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 backdrop-blur-md shadow-inner"
              />
            </div>

            {/* Swap Button */}
            <div className="flex items-center justify-center md:col-span-2">
              <button
                onClick={swapUnits}
                className="p-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white transition-all duration-300 transform hover:scale-110 shadow-lg shadow-cyan-500/30"
                title="Swap units"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>

            {/* To Section */}
            <div className="space-y-4 md:-mt-16">
              <label className="block text-white text-sm font-medium drop-shadow tracking-wider uppercase">To:</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-3 rounded-sm bg-white/20 border border-cyan-300/30 text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 backdrop-blur-md shadow-inner"
              >
                {Object.entries(categories[activeCategory].units).map(([key, unit]) => (
                  <option key={key} value={key} className="bg-slate-800 text-white">
                    {unit.name}
                  </option>
                ))}
              </select>
              <div className="w-full p-4 rounded-sm bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-300/30 text-white text-lg backdrop-blur-md min-h-[56px] flex items-center shadow-inner">
                <span className="text-2xl font-mono text-cyan-200 drop-shadow">
                  {result ? formatResult(result) : '0'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          {fromValue && result && (
            <div className="mt-8 p-4 rounded-sm bg-white/10 border border-cyan-300/20 backdrop-blur-md">
              <div className="text-center text-white">
                <span className="text-lg font-medium drop-shadow">{fromValue} {categories[activeCategory].units[fromUnit]?.name}</span>
                <span className="mx-4 text-cyan-300 text-xl">=</span>
                <span className="text-lg font-medium text-cyan-300 drop-shadow">{formatResult(result)} {categories[activeCategory].units[toUnit]?.name}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-cyan-200 text-sm relative z-10">
          <p className="drop-shadow tracking-wider">🌊 PRECISION MEASUREMENT CONVERSION • LENGTH • WEIGHT • TEMPERATURE • TIME • ENERGY • PRESSURE • AREA • SPEED • FORCE • POWER • VOLUME 🌊</p>
          <p className="text-cyan-300/60 text-xs mt-2 tracking-wide">Created by K3 DEV GROUP • Powered by Claude AI</p>
          <p className="text-cyan-400/50 text-xs mt-1 tracking-wide font-mono">Version 3.1.0 • Updated September 2025</p>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;