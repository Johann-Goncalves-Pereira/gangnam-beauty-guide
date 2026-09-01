export const trustCardKeys = {
	all: ['trust-card'] as const,
	extract: () => [...trustCardKeys.all, 'extract'] as const,
}
