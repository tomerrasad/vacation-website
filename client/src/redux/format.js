const formatDataForRedux=(data)=>{
    
    if (data.ids) {
      const followedVacations = data.vacations.filter(i=>data.ids.includes(i.id))
      const unFollowedVacations = data.vacations.filter(i=>!data.ids.includes(i.id))
      return{followedVacations,unFollowedVacations,allVacations:data.vacations}}
    else{
        const followedVacations = []
      const unFollowedVacations = data
      return{followedVacations,unFollowedVacations,allVacations:data}

      }

  }
  export default formatDataForRedux