import { useMemo, useState } from 'react';

export function useProjectFilters(projects = []) {
    const [filters, setFilters] = useState({
        locality: '',
        style: '',
        bhk: '',
        year: '',
    });

    const updateFilter = (name, value) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetFilters = () => {
        setFilters({
            locality: '',
            style: '',
            bhk: '',
            year: '',
        });
    };

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchLocality =
                !filters.locality || project.locality === filters.locality;

            const matchStyle =
                !filters.style || project.style === filters.style;

            const matchBhk =
                !filters.bhk || project.bhk === filters.bhk;

            const matchYear =
                !filters.year ||
                String(project.completion_year || project.year) ===
                    String(filters.year);

            return matchLocality && matchStyle && matchBhk && matchYear;
        });
    }, [projects, filters]);

    return {
        filters,
        filteredProjects,
        updateFilter,
        resetFilters,
    };
}
