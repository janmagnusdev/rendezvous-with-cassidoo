import { truncate } from './truncate';

interface truncateTest {
  input: [string, number];
  output: string;
}

const truncateTests: truncateTest[] = [
  {
    input: ['never gonna give you up', 3],
    output: 'nev gon giv you up',
  },
  {
    input: ['*hello* darkness, my ~old_friend', 3],
    output: '*hel* dar, my ~old_fri',
  },
  {
    input: ['*hello* darkness, my ~old_friend', 1],
    output: '*h* d, m ~o_f',
  },
  {
    input: ['*hello* darkness, my ~old_friend', 0],
    output: '** ,  ~_',
  },
  {
    input: ['*hel*lo* dark!ness, my ~old-friend', 3],
    output: '*hel*lo* dar!nes, my ~old-fri',
  },
  {
    input: ['*hello* darkness, my ~old_friend', -1],
    output: '*hello* darkness, my ~old_friend',
  },
];

describe('testing truncate', () => {
  it.each(truncateTests)('should return string with words truncated to length n', test => {
    expect(truncate(...test.input)).toStrictEqual(test.output);
  });
});
