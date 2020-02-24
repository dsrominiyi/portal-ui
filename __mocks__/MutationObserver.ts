const mockInstance = {
  disconnect: jest.fn(),
  observe: jest.fn()
};

const mockConstructor = jest.fn(() => mockInstance);

export default mockConstructor;
