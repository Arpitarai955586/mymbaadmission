import connectDB from './db';

interface CollegeRanking {
  collegeId: string;
  ranking: number;
  year: number;
  source: string;
}

export async function seedCollegeRankings() {
  try {
    const db = await connectDB();
    
    // Sample rankings data - you can modify this as needed
    const rankings: CollegeRanking[] = [
      { collegeId: '1', ranking: 1, year: 2025, source: 'NIRF' },
      { collegeId: '2', ranking: 2, year: 2025, source: 'NIRF' },
      { collegeId: '3', ranking: 3, year: 2025, source: 'NIRF' },
    ];

    // This would typically update your database
    // For now, we'll just return a mock result
    const updated = rankings.length;

    return { updated };
  } catch (error) {
    console.error('Error seeding rankings:', error);
    throw error;
  }
}
