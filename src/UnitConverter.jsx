import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Activity, Thermometer, Ruler, Scale, Clock, Zap, Gauge, Square, Wind, Move, Battery, Droplets } from 'lucide-react';

// Move categories outside component to prevent recreation
const categoriesData = {
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
    },
    time: {
      name: 'Time',
      icon: Clock,
      color: 'bg-indigo-500',
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
      color: 'bg-yellow-500',
      units: {
        j: { name: 'Joules', factor: 1 },
        cal: { name: 'Calories', factor: 4.184 },
        kcal: { name: 'Kilocalories', factor: 4184 },
        wh: { name: 'Watt-hours', factor: 3600 },
        kwh: { name: 'Kilowatt-hours', factor: 3600000 },
        btu: { name: 'BTU', factor: 1055.06 }
      }
    },
    pressure: {
      name: 'Pressure',
      icon: Gauge,
      color: 'bg-red-500',
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
    data: {
      name: 'Data',
      icon: Battery,
      color: 'bg-violet-500',
      units: {
        b: { name: 'Bytes', factor: 1 },
        kb: { name: 'Kilobytes', factor: 1024 },
        mb: { name: 'Megabytes', factor: 1048576 },
        gb: { name: 'Gigabytes', factor: 1073741824 },
        tb: { name: 'Terabytes', factor: 1099511627776 },
        pb: { name: 'Petabytes', factor: 1125899906842624 }
      }
    }
};

const UnitConverter = () => {
  const [activeCategory, setActiveCategory] = useState('length');
  const [fromValue, setFromValue] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState('');

  // Memoize categories to prevent recreation on each render
  const categories = useMemo(() => categoriesData, []);

  const decimalToFraction = useCallback((decimal) => {
    const wholeNumber = Math.floor(decimal);
    const fractionalPart = decimal - wholeNumber;
    
    const denominators = [2, 4, 8, 16];
    
    if (fractionalPart === 0) {
      return wholeNumber.toString() + '"';
    }
    
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
  }, []);

  const parseFractionalInches = useCallback((input) => {
    const str = input.toString().trim().replace(/"/g, '');
    
    if (!str) return 0;
    
    if (!isNaN(parseFloat(str)) && !str.includes('/') && !str.includes(' ')) {
      return parseFloat(str);
    }
    
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
    
    if (str.includes('/')) {
      const [numerator, denominator] = str.split('/');
      return (parseInt(numerator) || 0) / (parseInt(denominator) || 1);
    }
    
    return parseInt(str) || 0;
  }, []);

  const convertTemperature = useCallback((value, from, to) => {
    let celsius;
    
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
  }, []);

  const convertUnits = useCallback((value, from, to, category) => {
    if (!value || !from || !to) return '';
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';
    
    if (category === 'temperature') {
      return convertTemperature(numValue, from, to).toFixed(6);
    }
    
    const units = categories[category].units;
    const fromUnit = units[from];
    const toUnit = units[to];
    
    if (!fromUnit || !toUnit) return '';

    const fromFactor = fromUnit.factor || 1;
    const toFactor = toUnit.factor || 1;
    const result = (numValue * fromFactor) / toFactor;
    
    if (to === 'frac_in') {
      return decimalToFraction(result);
    }
    
    return result.toFixed(6);
  }, [categories, convertTemperature, decimalToFraction]);

  useEffect(() => {
    const categoryUnits = Object.keys(categories[activeCategory].units);
    if (!fromUnit || !categoryUnits.includes(fromUnit)) {
      setFromUnit(categoryUnits[0] || '');
    }
    if (!toUnit || !categoryUnits.includes(toUnit)) {
      setToUnit(categoryUnits[1] || categoryUnits[0] || '');
    }
  }, [activeCategory, categories, fromUnit, toUnit]);

  useEffect(() => {
    let converted = '';
    
    if (fromValue) {
      if (fromUnit === 'frac_in') {
        const parsedValue = parseFractionalInches(fromValue);
        if (!isNaN(parsedValue)) {
          converted = convertUnits(parsedValue, fromUnit, toUnit, activeCategory);
        }
      } else {
        const numValue = parseFloat(fromValue);
        if (!isNaN(numValue)) {
          converted = convertUnits(numValue, fromUnit, toUnit, activeCategory);
        }
      }
    }
    
    setResult(converted);
  }, [fromValue, fromUnit, toUnit, activeCategory, convertUnits, parseFractionalInches]);

  const formatResult = useCallback((value) => {
    if (!value) return '';
    const num = parseFloat(value);
    if (num === 0) return '0';
    if (Math.abs(num) >= 1000000 || Math.abs(num) <= 0.0001) {
      return num.toExponential(4);
    }
    return parseFloat(num.toPrecision(8)).toString();
  }, []);

  const swapUnits = useCallback(() => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setFromValue(result);
  }, [fromUnit, toUnit, result]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-900 p-4 relative overflow-hidden font-mono">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-white mb-1 flex items-center justify-center gap-2">
            <Activity className="w-6 h-6" />
            Unit Conversion System
          </h1>
          <p className="text-cyan-100 text-lg">SCIENTIFIC MEASUREMENT CONVERSION</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {Object.entries(categories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`p-3 rounded-sm transition-all ${
                  activeCategory === key
                    ? `${category.color} text-white`
                    : 'bg-white/15 text-cyan-100'
                }`}
              >
                <IconComponent className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs uppercase">{category.name}</div>
              </button>
            );
          })}
        </div>

        <div className="bg-white/15 backdrop-blur-xl rounded-sm p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-white text-sm uppercase">From:</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-3 bg-white/20 text-white"
              >
                {Object.entries(categories[activeCategory].units).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder="Enter value"
                className="w-full p-4 bg-white/20 text-white"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-white text-sm uppercase">To:</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-3 bg-white/20 text-white"
              >
                {Object.entries(categories[activeCategory].units).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
              <div className="w-full p-4 bg-white/20 text-white min-h-[56px]">
                {result ? formatResult(result) : '0'}
              </div>
            </div>
          </div>

          <button
            onClick={swapUnits}
            className="w-full p-3 bg-cyan-500 text-white hover:bg-cyan-600"
          >
            Swap Units
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;