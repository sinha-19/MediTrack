import axios from 'axios';
const FDA_API_BASE_URL = 'https://api.fda.gov/drug/label.json';
export const searchMedicines = async (query, limit = 5) => {
  try {
    if (!query || query.trim().length < 3) {
      return { results: [] };
    }
    const [brandResponse, genericResponse] = await Promise.all([
      axios.get(FDA_API_BASE_URL, {
        params: {
          search: `openfda.brand_name:${query}`,
          limit: limit
        }
      }).catch(() => ({ data: { results: [] } })),
      axios.get(FDA_API_BASE_URL, {
        params: {
          search: `openfda.generic_name:${query}`,
          limit: limit
        }
      }).catch(() => ({ data: { results: [] } }))
    ]);
    const allResults = [
      ...(brandResponse.data.results || []),
      ...(genericResponse.data.results || [])
    ];
    const uniqueResults = new Map();
    allResults.forEach(result => {
      const openfda = result.openfda || {};
      const key = openfda.brand_name?.[0] || openfda.generic_name?.[0];
      if (key && !uniqueResults.has(key)) {
        uniqueResults.set(key, {
          brandName: openfda.brand_name?.[0] || '',
          genericName: openfda.generic_name?.[0] || '',
          manufacturer: openfda.manufacturer_name?.[0] || '',
          description: result.description?.[0] || '',
          dosage: result.dosage_and_administration?.[0] || '',
          warnings: result.warnings?.[0] || '',
          route: openfda.route?.[0] || '',
        });
      }
    });
    return {
      results: Array.from(uniqueResults.values())
    };
  } catch (error) {
    console.error('Error searching medicines:', error);
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error.message || 'Failed to search medicines');
    }
    throw new Error('Failed to search medicines. Please try again later.');
  }
};
export const getMedicineDetails = async (brandName) => {
  try {
    const [brandResponse, genericResponse] = await Promise.all([
      axios.get(FDA_API_BASE_URL, {
        params: {
          search: `openfda.brand_name:"${brandName}"`,
          limit: 1
        }
      }).catch(() => ({ data: { results: [] } })),
      axios.get(FDA_API_BASE_URL, {
        params: {
          search: `openfda.generic_name:"${brandName}"`,
          limit: 1
        }
      }).catch(() => ({ data: { results: [] } }))
    ]);
    const result = brandResponse.data.results?.[0] || genericResponse.data.results?.[0];
    if (result) {
      const openfda = result.openfda || {};
      return {
        brandName: openfda.brand_name?.[0] || '',
        genericName: openfda.generic_name?.[0] || '',
        manufacturer: openfda.manufacturer_name?.[0] || '',
        description: result.description?.[0] || '',
        dosage: result.dosage_and_administration?.[0] || '',
        warnings: result.warnings?.[0] || '',
        route: openfda.route?.[0] || '',
        activeIngredients: result.active_ingredient?.[0] || '',
        indicationsAndUsage: result.indications_and_usage?.[0] || '',
        adverseReactions: result.adverse_reactions?.[0] || '',
        drugInteractions: result.drug_interactions?.[0] || '',
      };
    }
    throw new Error('Medicine details not found');
  } catch (error) {
    console.error('Error fetching medicine details:', error);
    throw new Error('Failed to fetch medicine details. Please try again later.');
  }
};