using Shop.Server.Models;
using System.Threading.Tasks;

namespace Shop.Server.Managers
{
    abstract public class BaseHistoryManager
    {
        public abstract Task SaveAsync(DataHistory dataHistory);
    }
}
