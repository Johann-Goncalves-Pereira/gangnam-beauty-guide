import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'ghost' | 'jade'
}

const variantClasses = {
	primary:
		'bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white',
	ghost:
		'border border-paper-muted/30 bg-transparent text-paper hover:border-jade/50 hover:bg-jade/5',
	jade: 'bg-jade text-white hover:bg-jade-muted border border-jade',
} satisfies Record<NonNullable<ButtonProps['variant']>, string>

export function Button({
	variant = 'primary',
	className = '',
	type = 'button',
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={`focus-visible:ring-jade/50 focus-visible:ring-offset-ink rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
			{...props}
		/>
	)
}
