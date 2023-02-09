export function getAward(goal: number, progress: number) {
  if (goal < 30) {
    if (progress < 25) {
      return "no-award";
    }

    if (progress >= 25 && progress < 50) {
      return "bronze-medal";
    }

    if (progress >= 50 && progress < 100) {
      return "silver-medal";
    }

    if (progress >= 100) {
      return "gold-medal";
    }
  }

  if (goal >= 30 && goal < 120) {
    if (progress < 10) {
      return "no-award";
    }

    if (progress >= 10 && progress < 15) {
      return "bronze-medal";
    }

    if (progress >= 15 && progress < 30) {
      return "silver-medal";
    }

    if (progress >= 30 && progress < 40) {
      return "gold-medal";
    }

    if (progress >= 40 && progress < 50) {
      return "bronze-trophy";
    }

    if (progress >= 50 && progress < 100) {
      return "silver-trophy";
    }

    if (progress >= 100) {
      return "gold-trophy";
    }
  }

  if (goal >= 120) {
    if (progress < 10) {
      return "no-award";
    }

    if (progress >= 10 && progress < 15) {
      return "bronze-medal";
    }

    if (progress >= 15 && progress < 20) {
      return "silver-medal";
    }

    if (progress >= 20 && progress < 30) {
      return "gold-medal";
    }

    if (progress >= 30 && progress < 40) {
      return "bronze-trophy";
    }

    if (progress >= 40 && progress < 50) {
      return "silver-trophy";
    }

    if (progress >= 50 && progress < 75) {
      return "gold-trophy";
    }

    if (progress >= 75 && progress < 100) {
      return "diamond-trophy";
    }

    if (progress >= 100) {
      return "crown";
    }
  }

  return "no-award";
}
