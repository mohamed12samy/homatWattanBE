
export  interface DistrictReligionDto {
    muslims: number;
    christians: number;
  }
  
 export interface GovernmentReligionDto {
    muslims: number;
    christians: number;
    districts: {
      [districtKey: string]: DistrictReligionDto;
    };
  }
  
 export interface MappedReligionData {
    muslims: number;
    christians: number;
    governments: {
      [governmentKey: string]: GovernmentReligionDto;
    };
  }