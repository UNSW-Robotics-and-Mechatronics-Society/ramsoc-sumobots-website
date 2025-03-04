export async function handleTeamRequest(req: Request, env: any): Promise<Response> {
	const url = new URL(req.url);
	const year = url.searchParams.get('year');

	if (!year) {
		return new Response(JSON.stringify({ error: 'Year is required' }), { status: 400 });
	}

	try {
		// Contentful API credentials from environment variables
		const spaceId = env.CONTENTFUL_SPACE_ID;
		const accessToken = env.CONTENTFUL_ACCESS_TOKEN;
		const contentType = 'team';

		// Fetch data from Contentful
		const contentfulUrl = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=${contentType}&order=fields.year,fields.role,fields.name&include=1`;
		const response = await fetch(contentfulUrl);

		if (!response.ok) {
			throw new Error('Failed to fetch data from Contentful');
		}

		const data = (await response.json()) as { items: any[]; includes?: { Asset?: any[] } };

		// Filter by year
		const yearTeamData = data.items
			.filter((item: any) => item.fields.year?.toString() === year)
			.map((item: any) => {
				const selfieUrl = data.includes?.Asset?.find((a: any) => a.sys.id === item.fields.selfie?.sys.id)?.fields.file?.url;
				const nameParts = (item.fields.name as string).split(' ');
				const formattedName = nameParts.length > 2 ? `${nameParts[0]} ${nameParts[2]}` : item.fields.name;
				return {
					id: item.sys.id,
					name: formattedName,
					role: item.fields.role,
					year: item.fields.year,
					selfie: selfieUrl ? `https:${selfieUrl}?fm=jpg&fit=fill&w=500&h=500` : '',
					email: item.fields.email,
					linkedin: item.fields.linkedin,
				};
			});

		return new Response(JSON.stringify(yearTeamData), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to fetch team data' }), { status: 500 });
	}
}
