import { PolicyType } from './policyTypeInfoMap';

const policyTypeMapper = (quoteType: string) => {
  let type: PolicyType | undefined;
  Object.entries(PolicyType).forEach(([key, value]) => {
    type = value === quoteType ? PolicyType[key as keyof typeof PolicyType] : type;
  });
  return type;
};

export default policyTypeMapper;
