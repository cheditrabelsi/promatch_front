import React, { useState, useEffect } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Slider,
  Button,
  Box,
} from '@mui/material';
import axios from 'axios';

type FiltersOptions = {
  cities: string[];
  categories: string[];
};

type Option = {
  value: string;
  label: string;
};

type ActiveFilters = {
  search?: string;
  city?: string;
  categories?: string[];
  types?: string[];
  levels?: string[];
  salary_min?: number;
  salary_max?: number;
};

interface JobFiltersProps {
  onFiltersChange: (filters: ActiveFilters) => void;
}

export default function JobFilters({ onFiltersChange }: JobFiltersProps) {
  const [options, setOptions] = useState<FiltersOptions>({
    cities: [],
    categories: [],
  });
  const [jobTypesOptions, setJobTypesOptions] = useState<Option[]>([]);
  const [experienceLevelsOptions, setExperienceLevelsOptions] = useState<Option[]>([]);

  // États des filtres actifs
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [salary, setSalary] = useState<[number, number]>([0, 10000]);

  // Chargement des options de filtres (villes, catégories, etc.)
  useEffect(() => {
    const fetchAndExtractFilters = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/jobs/recent/?limit=100'); // prends assez pour avoir toutes les valeurs
        const jobs = response.data; // ← c’est un tableau d’offres comme ton exemple

        console.log('Offres reçues :', jobs);

        // Extraction unique des valeurs
        const cities = [...new Set(jobs.map((job: any) => job.location).filter(Boolean))];
        const categories = [...new Set(jobs.map((job: any) => job.category?.toUpperCase()).filter(Boolean))];
        const jobTypes = [...new Set(jobs.map((job: any) => job.job_type).filter(Boolean))];
        const experienceLevels = [...new Set(jobs.map((job: any) => job.experience).filter(Boolean))];

        // Conversion des noms pour l’affichage (optionnel)
        const formatExperience = (exp: string) => {
          const map: any = {
            NO_EXP: 'Sans expérience',
            JUNIOR: 'Junior (1-3 ans)',
            MID: 'Intermédiaire (3-5 ans)',
            SENIOR: 'Senior (5+ ans)',
            EXPERT: 'Expert',
          };
          return map[exp] || exp;
        };

        const formatJobType = (type: string) => {
          const map: any = {
            FULL_TIME: 'CDI',
            PART_TIME: 'Temps partiel',
            FREELANCE: 'Freelance',
            INTERNSHIP: 'Stage',
            CONTRACT: 'CDD',
          };
          return map[type] || type;
        };

        setOptions({
          cities,
          categories,
        });

        setJobTypesOptions(
          jobTypes.map((type: string) => ({
            value: type,
            label: formatJobType(type),
          })),
        );
        setExperienceLevelsOptions(
          experienceLevels.map((exp: string) => ({
            value: exp,
            label: formatExperience(exp),
          })),
        );
      } catch (error) {
        console.error('Erreur API jobs :', error);
        // Données par défaut si backend HS
        setOptions({
          cities: ['Tunis', 'Sfax', 'Sousse'],
          categories: ['IT', 'Marketing', 'Finance'],
        });
        setJobTypesOptions([
          { value: 'FREELANCE', label: 'Freelance' },
          { value: 'FULL_TIME', label: 'CDI' },
          { value: 'INTERNSHIP', label: 'Stage' },
        ]);
        setExperienceLevelsOptions([
          { value: 'NO_EXP', label: 'Sans expérience' },
          { value: 'JUNIOR', label: 'Junior' },
        ]);
      }
    };

    fetchAndExtractFilters();
  }, []);

  const applyFilters = () => {
    const filters: ActiveFilters = {
      search: search || undefined,
      city: city || undefined,
      categories: categories.length ? categories : undefined,
      types: types.length ? types : undefined,
      levels: levels.length ? levels : undefined,
      salary_min: salary[0] > 0 ? salary[0] : undefined,
      salary_max: salary[1] < 10000 ? salary[1] : undefined,
    };
    onFiltersChange(filters);
  };

  const reset = () => {
    setSearch('');
    setCity('');
    setCategories([]);
    setTypes([]);
    setLevels([]);
    setSalary([0, 10000]);
    onFiltersChange({});
  };

  return (
    <aside className="bg-[#EBF5F4] p-6 rounded-lg shadow space-y-7">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Filtres</h2>
        <button onClick={reset} className="text-sm text-[#309689] hover:underline">
          Réinitialiser
        </button>
      </div>

      {/* Recherche */}
      <TextField
        fullWidth
        size="small"
        placeholder="Poste ou entreprise"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && applyFilters()}
      />

      {/* Ville */}
      <FormControl fullWidth size="small">
        <InputLabel>Ville</InputLabel>
        <Select value={city} label="Ville" onChange={(e) => setCity(e.target.value)}>
          <MenuItem value="">Toutes les villes</MenuItem>
          {options.cities.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Catégories */}
      <div>
        <h3 className="font-semibold mb-3">Catégorie</h3>
        {options.categories.map((cat) => (
          <FormControlLabel
            key={cat}
            control={
              <Checkbox
                size="small"
                checked={categories.includes(cat)}
                onChange={(e) =>
                  setCategories((prev) =>
                    e.target.checked ? [...prev, cat] : prev.filter((x) => x !== cat),
                  )
                }
              />
            }
            label={cat}
            sx={{ '.MuiFormControlLabel-label': { fontSize: '0.95rem' } }}
          />
        ))}
      </div>

      {/* Type de contrat */}
      <div>
        <h3 className="font-semibold mb-3">Type de contrat</h3>
        {jobTypesOptions.map((type) => (
          <FormControlLabel
            key={type.value}
            control={
              <Checkbox
                size="small"
                checked={types.includes(type.value)}
                onChange={(e) =>
                  setTypes((prev) =>
                    e.target.checked ? [...prev, type.value] : prev.filter((x) => x !== type.value),
                  )
                }
              />
            }
            label={type.label}
          />
        ))}
      </div>

      {/* Expérience */}
      <div>
        <h3 className="font-semibold mb-3">Expérience</h3>
        {experienceLevelsOptions.map((level) => (
          <FormControlLabel
            key={level.value}
            control={
              <Checkbox
                size="small"
                checked={levels.includes(level.value)}
                onChange={(e) =>
                  setLevels((prev) =>
                    e.target.checked ? [...prev, level.value] : prev.filter((x) => x !== level.value),
                  )
                }
              />
            }
            label={level.label}
          />
        ))}
      </div>

      {/* Salaire */}
      <div>
        <h3 className="font-semibold mb-3">Salaire (DT)</h3>
        <Box sx={{ px: 1 }}>
          <Slider
            value={salary}
            onChange={(_, v) => setSalary(v as [number, number])}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
            sx={{ color: '#309689' }}
          />
          <div className="flex justify-between text-sm text-[#309689] font-medium">
            <span>{salary[0].toLocaleString()} DT</span>
            <span>{salary[1] === 10000 ? 'Illimité' : salary[1].toLocaleString() + ' DT'}</span>
          </div>
        </Box>
      </div>

      {/* Bouton Appliquer */}
      <Button fullWidth variant="contained" onClick={applyFilters} sx={{ bgcolor: '#309689', py: 1.5 }}>
        Appliquer les filtres
      </Button>
    </aside>
  );
}