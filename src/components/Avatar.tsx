import classNames from 'classnames';

type Props = {
  title?: string;
  size?: 'md' | 'lg';
};

function titleResult(title: string | undefined) {
  if (!title) {
    return null;
  }
  const nameParts = title.trim().split(/\s+/);
  return nameParts.map((part) => part.charAt(0)).join('').toUpperCase();
}

export default function Avatar({ title, size = 'md' }: Props) {
  return (
    <div
      className={classNames(
        'rounded-pill bg-secondary-100 d-flex align-items-center justify-content-center',
        size === 'lg' ? 'fs-3' : 'small',
      )}
      style={{
        width: size === 'lg' ? 100 : 32,
        height: size === 'lg' ? 100 : 32,
      }}
    >
      {titleResult(title)}
    </div>
  );
}
