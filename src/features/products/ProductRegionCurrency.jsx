import { useFormContext } from 'react-hook-form';
import { useFetchData } from '../../hooks/useFetchData';
import { getCurrencies } from '../../services/apiCurrencies';
import { getRegions } from '../../services/apiRegions';
import { Option, Select } from '../../ui/Selection';
import SpinnerMini from '../../ui/SpinnerMini';

function ProductRegionCurrency() {
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
        defaultValue={`${isEditSession ? editProduct.currency : 'region'}`}
        {...register(`region`, {
          valueAsNumber: true,
        })}
      >
        <Option
          value={`${isEditSession ? editProduct.region : 'region'}`}
          disabled
        >
          {isEditSession ? editProduct.region : 'Select Region'}
        </Option>

        {regionsData.map((option) => (
          <Option key={option.id} value={option.id}>
            {option.regionEnglishName}
          </Option>
        ))}
      </Select>

      <Select
        {...register(`currency`, {
          valueAsNumber: true,
        })}
        defaultValue={`${isEditSession ? editProduct.currency : 'currency'}`}
      >
        <Option
          value={`${isEditSession ? editProduct.currency : 'currency'}`}
          disabled
        >
          {isEditSession ? editProduct.currency : 'Select Currency'}
        </Option>

        {currenciesData.map((option) => (
          <Option key={option.id} value={option.id}>
            {option.currencyEnglishName}
          </Option>
        ))}
      </Select>
    </>
  );
}

export default ProductRegionCurrency;
