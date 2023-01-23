export const getNextAward = (goal: number, progress: number) => {
  if (goal < 30) {
    if (progress < 25) {
      return {
        img: "bronze-medal",
        percentage: 25,
      };
    }

    if (progress >= 25 && progress < 50) {
      return {
        img: "silver-medal",
        percentage: 50,
      };
    }

    if (progress >= 50 && progress < 100) {
      return {
        img: "gold-medal",
        percentage: 100,
      };
    }

    if (progress >= 100) {
      return {
        img: "change-goal",
        percentage: 100,
      };
    }
  }

  if (goal >= 30 && goal < 120) {
    if (progress < 10) {
      return {
        img: "bronze-medal",
        percentage: 10,
      };
    }

    if (progress >= 10 && progress < 15) {
      return {
        img: "silver-medal",
        percentage: 15,
      };
    }

    if (progress >= 15 && progress < 30) {
      return {
        img: "gold-medal",
        percentage: 30,
      };
    }

    if (progress >= 30 && progress < 40) {
      return {
        img: "bronze-trophy",
        percentage: 40,
      };
    }

    if (progress >= 40 && progress < 50) {
      return {
        img: "silver-trophy",
        percentage: 50,
      };
    }

    if (progress >= 50 && progress < 100) {
      return {
        img: "gold-trophy",
        percentage: 100,
      };
    }

    if (progress >= 100) {
      return {
        img: "change-goal",
        percentage: 100,
      };
    }
  }

  if (goal >= 120) {
    if (progress < 10) {
      return {
        img: "bronze-medal",
        percentage: 10,
      };
    }

    if (progress >= 10 && progress < 15) {
      return {
        img: "silver-medal",
        percentage: 15,
      };
    }

    if (progress >= 15 && progress < 20) {
      return {
        img: "gold-medal",
        percentage: 20,
      };
    }

    if (progress >= 20 && progress < 30) {
      return {
        img: "bronze-trophy",
        percentage: 30,
      };
    }

    if (progress >= 30 && progress < 40) {
      return {
        img: "silver-trophy",
        percentage: 40,
      };
    }

    if (progress >= 40 && progress < 50) {
      return {
        img: "gold-trophy",
        percentage: 50,
      };
    }

    if (progress >= 50 && progress < 75) {
      return {
        img: "diamond-trophy",
        percentage: 75,
      };
    }

    if (progress >= 75) {
      return {
        img: "crown",
        percentage: 100,
      };
    }
  }

  return {
    img: "no-award",
    percentage: 0,
  };
};
