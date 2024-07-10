import { render, screen } from '@/test-utils';
import { ExplorerLinks } from './ExplorerLinks';

describe('Explorer Links component', () => {
  it('has the correct links', () => {
    render(<ExplorerLinks />);
    expect(screen.getByText('Characters')).toHaveAttribute('href', '/characters');
    expect(screen.getByText('Episodes')).toHaveAttribute('href', '/episodes');
    expect(screen.getByText('Locations')).toHaveAttribute('href', '/locations');
  });
});
