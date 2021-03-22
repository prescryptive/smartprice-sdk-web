// Copyright 2021 Prescryptive Health Inc
import { getPhoneNumber } from './phoneParser';

describe('phoneParser', () => {
  it('getPhoneNumber returns null if not ten digit number', () => {
    expect(getPhoneNumber('2000-01002')).toEqual(null);
    expect(getPhoneNumber('2000')).toEqual(null);
    expect(getPhoneNumber('123456789')).toEqual(null);
  })

  it('getPhoneNumber returns phone number with format +1', () => {
    expect(getPhoneNumber('0123456789')).toEqual('+10123456789');
  })
});