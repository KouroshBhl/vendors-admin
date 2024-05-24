import { useFormContext } from 'react-hook-form';
import { useFetchData } from '../../hooks/useFetchData';
import { getCurrencies } from '../../services/apiCurrencies';
import { getRegions } from '../../services/apiRegions';
import { Option, Select } from '../../ui/Selection';
import SpinnerMini from '../../ui/SpinnerMini';

function ProductRegionCurrency({ index }) {
  const { register, isEditSession, editProduct } = useFormContext();
  const { isLoading: isLoadingRegions, data: regionsData } = useFetchData(
    'regions',
    getRegions
  );

  const { isLoading: isLoadingCurrencies, data: currenciesData } = useFetchData(
    'currencies',
    getCurrencies
  );

  if (isLoadingCurrencies || isLoadingRegions) return <SpinnerMini />;

  return (
    <>
      <Select
        {...register(`selections.${index}.region`)}
        defaultValue={`${isEditSession ? editProduct?.selections[index]?.region : 'region'}`}
      >
        <Option
          value={`${isEditSession ? editProduct?.selections[index]?.region : 'region'}`}
          disabled
        >
          {isEditSession ? editProduct?.selections[index]?.region : 'Select'}
        </Option>

        {regionsData.map((option) => (
          <Option key={option.id} value={option.regionEnglishName}>
            {option.regionEnglishName}
          </Option>
        ))}
      </Select>

      <Select
        {...register(`selections.${index}.currency`)}
        defaultValue={`${isEditSession ? editProduct?.selections[index]?.currency : 'currency'}`}
      >
        <Option
          value={`${isEditSession ? editProduct?.selections[index]?.currency : 'currency'}`}
          disabled
        >
          {isEditSession ? editProduct?.selections[index]?.currency : 'Select'}
        </Option>

        {currenciesData.map((option) => (
          <Option key={option.id} value={option.currencyEnglishName}>
            {option.currencyEnglishName}
          </Option>
        ))}
      </Select>
    </>
  );
}

export default ProductRegionCurrency;
