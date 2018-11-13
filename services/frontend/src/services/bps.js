import mockedBPs from 'mock/bps'

export const findBPs = async (filter = {}) => mockedBPs

export const findBPById = async id => mockedBPs[id]
